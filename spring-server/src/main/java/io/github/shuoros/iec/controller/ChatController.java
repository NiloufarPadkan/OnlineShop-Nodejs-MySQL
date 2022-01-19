package io.github.shuoros.iec.controller;

import io.github.shuoros.iec.model.Chat;
import io.github.shuoros.iec.model.User;
import io.github.shuoros.iec.service.AdminService;
import io.github.shuoros.iec.service.ChatService;
import io.github.shuoros.iec.service.UserService;
import io.github.shuoros.iec.util.Constants;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.lang.invoke.MethodHandles;
import java.security.Principal;
import java.util.Date;

@Controller
public class ChatController {

    private static final Logger log = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    public UserService userService;
    @Autowired
    public AdminService adminService;
    @Autowired
    public ChatService chatService;

    @Autowired
    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping(Constants.ENDPOINT_USER + "/chat")
    public void userChat(Message<Object> message, @Payload String payload, Principal principal) throws Exception {
        String session = principal.getName();
        log.info("<=== handleLogInCheckEvent: session=" + session + ", payload=" + payload);
        JSONObject data = new JSONObject(payload);
        JSONObject response = new JSONObject();
        if (userService.existByJwt(data.getString("jwt"))) {
            User user = userService.getByJwt(data.getString("jwt")).get();
            adminService.all().forEach(admin -> {
                response.put("status", 200);
                response.put("destination", "notif");
                response.put("data", new JSONObject()//
                        .put("user", user.getUsername())//
                        .put("message", data.getString("message")));
                messagingTemplate.convertAndSendToUser(admin.getSession(),//
                        Constants.SUBSCRIBE_USER_REPLY,//
                        response.toString());
            });
            chatService.save(Chat.builder()//
                    .message(data.getString("message"))//
                    .admin(false)//
                    .user(user.getUsername())//
                    .date(new Date())//
                    .build());
        } else {
            response.put("status", 403);
            response.put("destination", "error");
            messagingTemplate.convertAndSendToUser(session,//
                    Constants.SUBSCRIBE_USER_REPLY,//
                    response.toString());
        }
    }

    @MessageMapping(Constants.ENDPOINT_ADMIN + "/chat")
    public void adminChat(Message<Object> message, @Payload String payload, Principal principal) throws Exception {
        String session = principal.getName();
        log.info("<=== handleLogInCheckEvent: session=" + session + ", payload=" + payload);
        JSONObject data = new JSONObject(payload);
        JSONObject response = new JSONObject();
        if (adminService.existByJwt(data.getString("jwt"))) {
            if (userService.existByUserName(data.getInt("user"))) {
                User user = userService.getByUsername(data.getInt("user")).get();
                response.put("status", 200);
                response.put("destination", "notif");
                response.put("data", new JSONObject()//
                        .put("message", data.getString("message")));
                messagingTemplate.convertAndSendToUser(user.getSession(),//
                        Constants.SUBSCRIBE_USER_REPLY,//
                        response.toString());
            }
            chatService.save(Chat.builder()//
                    .message(data.getString("message"))//
                    .admin(true)//
                    .user(data.getInt("user"))//
                    .date(new Date())//
                    .build());
        } else {
            response.put("status", 403);
            response.put("destination", "error");
            messagingTemplate.convertAndSendToUser(session,//
                    Constants.SUBSCRIBE_USER_REPLY,//
                    response.toString());
        }
    }
}
