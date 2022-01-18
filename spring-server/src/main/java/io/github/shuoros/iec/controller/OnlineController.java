package io.github.shuoros.iec.controller;

import io.github.shuoros.iec.model.Admin;
import io.github.shuoros.iec.model.User;
import io.github.shuoros.iec.service.AdminService;
import io.github.shuoros.iec.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
@Slf4j
public class OnlineController {

    private static final int twentyFourHours = 86400000;

    @Autowired
    public static UserService userService;
    @Autowired
    public static AdminService adminService;

    @Scheduled(fixedDelay = twentyFourHours)
    public static void removeAfter24() {
        log.info("online check!");
        List<User> users = userService.all();
        List<Admin> admins = adminService.all();
        users.forEach(user -> {
            if (user.getOnline().getDate() != new Date().getDate())
                userService.delete(user.getId());
        });
        admins.forEach(admin -> {
            if (admin.getOnline().getDate() != new Date().getDate())
                userService.delete(admin.getId());
        });
    }
}
