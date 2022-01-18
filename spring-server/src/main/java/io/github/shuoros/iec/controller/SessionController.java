package io.github.shuoros.iec.controller;

import io.github.shuoros.iec.model.Admin;
import io.github.shuoros.iec.model.User;
import io.github.shuoros.iec.service.AdminService;
import io.github.shuoros.iec.service.UserService;
import io.github.shuoros.iec.util.Constants;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.reactive.function.client.WebClient;

import java.lang.invoke.MethodHandles;
import java.security.Principal;
import java.util.Date;

@Controller
public class SessionController {

    private static final Logger log = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    private final SimpMessagingTemplate messagingTemplate;

    @Value("${node.server}")
    private String nodeServer;

    @Autowired
    public WebClient.Builder webClientBuilder;
    @Autowired
    public UserService userService;
    @Autowired
    public AdminService adminService;

    @Autowired
    public SessionController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping(Constants.ENDPOINT_USER + "/init")
    public void initUser(Message<Object> message, @Payload String payload, Principal principal) throws Exception {
        String session = principal.getName();
        log.info("<=== handleLogInCheckEvent: session=" + session + ", payload=" + payload);
        JSONObject data = new JSONObject(payload);
        JSONObject response = new JSONObject();
        JSONObject callback = new JSONObject(webClientBuilder.build()//
                .post() //
                .uri(nodeServer + "/customer/me")//
                .header("authorization", data.getString("jwt"))//
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)//
                .body("", String.class)
                .retrieve().bodyToMono(String.class).block());
        if (callback.has("id")) {
            User user = User.builder()//
                    .username(callback.getInt("id"))//
                    .jwt(data.getString("jwt"))//
                    .session(session)//
                    .online(new Date())//
                    .build();
            userService.save(user);
            response.put("status", 200);
        } else {
            response.put("status", 403);
        }
        response.put("destination", "init");
        messagingTemplate.convertAndSendToUser(session,//
                Constants.SUBSCRIBE_USER_REPLY,//
                response.toString());
    }

    @MessageMapping(Constants.ENDPOINT_ADMIN + "/init")
    public void initAdmin(Message<Object> message, @Payload String payload, Principal principal) throws Exception {
        String session = principal.getName();
        log.info("<=== handleLogInCheckEvent: session=" + session + ", payload=" + payload);
        JSONObject data = new JSONObject(payload);
        JSONObject response = new JSONObject();
        JSONObject callback = new JSONObject(webClientBuilder.build()//
                .post() //
                .uri(nodeServer + "/admin/me")//
                .header("authorization", data.getString("jwt"))//
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)//
                .body("", String.class)
                .retrieve().bodyToMono(String.class).block());
        if (callback.has("id")) {
            Admin admin = Admin.builder()//
                    .username(callback.getInt("id"))//
                    .jwt(data.getString("jwt"))//
                    .session(session)//
                    .online(new Date())//
                    .build();
            adminService.save(admin);
            response.put("status", 200);
        } else {
            response.put("status", 403);
        }
        response.put("destination", "init");
        messagingTemplate.convertAndSendToUser(session,//
                Constants.SUBSCRIBE_USER_REPLY,//
                response.toString());
    }

}
