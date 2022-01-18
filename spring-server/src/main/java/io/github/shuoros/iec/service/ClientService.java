package io.github.shuoros.iec.service;

import io.github.shuoros.iec.model.Client;
import io.github.shuoros.iec.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository repo;

    public Client save(Client client) {
        return repo.save(client);
    }

    public Optional<Client> get(String id) {
        return repo.findById(id);
    }

    public boolean exist(String id) {
        return repo.existsById(id);
    }

    public boolean existByUserName(String username) {
        return getByUsername(username).isPresent();
    }

    public Optional<Client> getByUsername(String username) {
        List<Client> temp = repo.findByUsername(username);
        return temp.isEmpty() ? Optional.empty() : Optional.of(repo.findByUsername(username).get(0));
    }

    public List<Client> all() {
        return repo.findAll();
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}
