package io.github.shuoros.iec.controller;

import io.github.shuoros.iec.model.Admin;
import io.github.shuoros.iec.model.User;
import io.github.shuoros.iec.service.AdminService;
import io.github.shuoros.iec.service.ChatService;
import io.github.shuoros.iec.service.UserService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.reactive.function.client.WebClient;

import javax.servlet.http.HttpServletRequest;
import java.lang.invoke.MethodHandles;
import java.util.Date;
import java.util.List;

@Controller
public class ThymleafController {

    private static final Logger log = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    @Value("${node.server}")
    private String nodeServer;

    @Autowired
    public WebClient.Builder webClientBuilder;

    @Autowired
    public ChatService chatService;

    @Autowired
    public AdminService adminService;

    @Autowired
    public UserService userService;

    @RequestMapping("/")
    public String index(@CookieValue(value = "JSESSIONID", defaultValue = "null") String session,
                        @RequestParam(defaultValue = "null") String jwt,
                        @RequestParam(defaultValue = "null") String who,
                        HttpServletRequest request, Model model) {
        log.info("<=== handleIndexResource: session=" + jwt + ", ip=" + request.getRemoteAddr() + ", user-agent="
                + request.getHeader("User-Agent"));
        if ("admin".equals(who) && isAdminAuthorized(jwt, session)) {
            List<Integer> users = chatService.getUniqueUsers();
            List<String> chats = chatService.getUniqueChatsLastMessage();
            model.addAttribute("users", users);
            model.addAttribute("chats", chats);
            model.addAttribute("who", "admin");
        } else if ("user".equals(who) && isUserAuthorized(jwt, session)) {
            User user = userService.getByJwt(jwt).get();
            List<String> chats = chatService.getAChatMessages(user.getUsername());
            model.addAttribute("chats", chats);
            model.addAttribute("who", "user");
        }
        return "index";
    }

    public boolean isAdminAuthorized(String jwt, String session) {
//        JSONObject callback = new JSONObject(webClientBuilder.build()//
//                .post() //
//                .uri(nodeServer + "/admin/me")//
//                .header("authorization", jwt)//
//                .contentType(MediaType.APPLICATION_JSON)
//                .accept(MediaType.APPLICATION_JSON)//
//                .body("", String.class)
//                .retrieve().bodyToMono(String.class).block());
        JSONObject callback = new JSONObject();
        callback.put("id", 1);
        if (callback.has("id")) {
            Admin admin;
            if (adminService.existByUserName(callback.getInt("id"))) {
                admin = adminService.getByUsername(callback.getInt("id")).get();
                admin.setJwt(jwt);
                admin.setSession(session);
                admin.setOnline(new Date());
            } else {
                admin = Admin.builder()//
                        .username(callback.getInt("id"))//
                        .jwt(jwt)//
                        .session(session)//
                        .online(new Date())//
                        .build();
            }
            adminService.save(admin);
            return true;
        }
        return false;
    }

    public boolean isUserAuthorized(String jwt, String session) {
//        JSONObject callback = new JSONObject(webClientBuilder.build()//
//                .post() //
//                .uri(nodeServer + "/customer/me")//
//                .header("authorization", jwt)//
//                .contentType(MediaType.APPLICATION_JSON)
//                .accept(MediaType.APPLICATION_JSON)//
//                .body("", String.class)
//                .retrieve().bodyToMono(String.class).block());
        JSONObject callback = new JSONObject();
        callback.put("id", 2);
        if (callback.has("id")) {
            User user;
            if (userService.existByUserName(callback.getInt("id"))) {
                user = userService.getByUsername(callback.getInt("id")).get();
                user.setJwt(jwt);
                user.setSession(session);
                user.setOnline(new Date());
            } else {
                user = User.builder()//
                        .username(callback.getInt("id"))//
                        .jwt(jwt)//
                        .session(session)//
                        .online(new Date())//
                        .build();
            }
            userService.save(user);
            return true;
        }
        return false;
    }

}
