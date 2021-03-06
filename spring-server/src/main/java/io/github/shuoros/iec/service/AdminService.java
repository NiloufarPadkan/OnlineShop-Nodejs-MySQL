package io.github.shuoros.iec.service;

import io.github.shuoros.iec.model.Admin;
import io.github.shuoros.iec.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repo;

    public Admin save(Admin admin) {
        return repo.save(admin);
    }

    public Optional<Admin> get(String id) {
        return repo.findById(id);
    }

    public boolean exist(String id) {
        return repo.existsById(id);
    }

    public boolean existByUserName(int username) {
        return getByUsername(username).isPresent();
    }

    public Optional<Admin> getByUsername(int username) {
        List<Admin> temp = repo.findByUsername(username);
        return temp.isEmpty() ? Optional.empty() : Optional.of(temp.get(0));
    }

    public boolean existByJwt(String jwt) {
        return getByJwt(jwt).isPresent();
    }

    public Optional<Admin> getByJwt(String jwt) {
        List<Admin> temp = repo.findByJwt(jwt);
        return temp.isEmpty() ? Optional.empty() : Optional.of(temp.get(0));
    }

    public List<Admin> all() {
        return repo.findAll();
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}
