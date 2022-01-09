package io.github.shuoros.iec.controller;

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

@Controller
public class SessionController {

    private static final Logger log = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    public SessionController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping(Constants.ENDPOINT_USER + "/init")
    public void init(Message<Object> message, @Payload String payload, Principal principal) throws Exception {
        String session = principal.getName();
        log.info("<=== handleLogInCheckEvent: session=" + session + ", payload=" + payload);
        JSONObject data = new JSONObject(payload);

    }

}
