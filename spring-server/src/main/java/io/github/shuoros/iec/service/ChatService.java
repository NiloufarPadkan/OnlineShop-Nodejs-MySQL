package io.github.shuoros.iec.service;

import io.github.shuoros.iec.model.Chat;
import io.github.shuoros.iec.model.User;
import io.github.shuoros.iec.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatRepository repo;

    public Chat save(Chat chat) {
        return repo.save(chat);
    }

    public Optional<Chat> get(String id) {
        return repo.findById(id);
    }

    public boolean exist(String id) {
        return repo.existsById(id);
    }

    public List<Integer> getUniqueUsers(){
            List<Integer> users = new ArrayList<>();
        all().forEach(chat -> {
            if(!users.contains(chat.getUser()))
                users.add(chat.getUser());
        });
        return users;
    }

    public List<String> getUniqueChatsLastMessage(){
        List<String> messages = new ArrayList<>();
        List<Integer> users = new ArrayList<>();
        List<Chat> reversedChats = all();
        Collections.reverse(reversedChats);
        reversedChats.forEach(chat -> {
            if(!users.contains(chat.getUser())) {
                users.add(chat.getUser());
                messages.add(chat.getMessage());
            }
        });
        return messages;
    }

    public List<String> getAChatMessages(int user){
        List<String> messages = new ArrayList<>();
        all().forEach(chat -> {
            if(chat.getUser() == user)
                if(chat.isAdmin())
                    messages.add("admin: ".concat(chat.getMessage()));
                else
                    messages.add("you: ".concat(chat.getMessage()));
        });
        return messages;
    }

    public List<String> getAChatMessagesForAdmin(int user){
        List<String> messages = new ArrayList<>();
        all().forEach(chat -> {
            if(chat.getUser() == user)
                if(chat.isAdmin())
                    messages.add("you: ".concat(chat.getMessage()));
                else
                    messages.add("user: ".concat(chat.getMessage()));
        });
        return messages;
    }

    public List<Chat> all() {
        return repo.findAll();
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}
