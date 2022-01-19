package io.github.shuoros.iec.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import io.github.shuoros.iec.model.Client;
import io.github.shuoros.iec.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service(value = "userDetailsService")
public class UserDetails implements UserDetailsService {

    @Autowired
    private ClientService clientService;


    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String name)
            throws UsernameNotFoundException {
        Client client;
        if (clientService.getByUsername(name).isPresent())
            client = clientService.getByUsername(name).get();
        else
            throw new UsernameNotFoundException("Invalid username or password.");

        List<String> listRoles = new ArrayList<>(client.getRoles());
        List<GrantedAuthority> authorities = listRoles.stream().map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(client.getUsername(), client.getPassword(),
                authorities);
    }
}
