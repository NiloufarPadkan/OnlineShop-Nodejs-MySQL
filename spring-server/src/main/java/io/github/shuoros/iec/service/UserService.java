package io.github.shuoros.iec.service;

import io.github.shuoros.iec.model.User;
import io.github.shuoros.iec.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    public User save(User user) {
        return repo.save(user);
    }

    public Optional<User> get(String id) {
        return repo.findById(id);
    }

    public boolean exist(String id) {
        return repo.existsById(id);
    }

    public boolean existByUserName(int username) {
        return getByUsername(username).isPresent();
    }

    public Optional<User> getByUsername(int username) {
        List<User> temp = repo.findByUsername(username);
        return temp.isEmpty() ? Optional.empty() : Optional.of(temp.get(0));
    }

    public boolean existByJwt(String jwt) {
        return getByJwt(jwt).isPresent();
    }

    public Optional<User> getByJwt(String jwt) {
        List<User> temp = repo.findByJwt(jwt);
        return temp.isEmpty() ? Optional.empty() : Optional.of(temp.get(0));
    }

    public List<User> all() {
        return repo.findAll();
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}
