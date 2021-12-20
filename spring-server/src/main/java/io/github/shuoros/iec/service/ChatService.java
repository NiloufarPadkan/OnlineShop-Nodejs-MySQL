package io.github.shuoros.iec.service;

import io.github.shuoros.iec.model.Chat;
import io.github.shuoros.iec.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<Chat> all() {
        return repo.findAll();
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}
