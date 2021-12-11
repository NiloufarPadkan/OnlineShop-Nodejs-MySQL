package io.github.shuoros.iec.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@SuppressWarnings("deprecation")
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker(Constants.SUBSCRIBE_QUEUE, Constants.SUBSCRIBE_USER_REPLY);
        config.setUserDestinationPrefix(Constants.SUBSCRIBE_USER_PREFIX);
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint(Constants.ENDPOINT_CONNECT, Constants.ENDPOINT_USER, Constants.ENDPOINT_ADMIN)
                .setHandshakeHandler(new AssignPrincipalHandshakeHandler()).setAllowedOrigins("*").withSockJS();
    }

}
