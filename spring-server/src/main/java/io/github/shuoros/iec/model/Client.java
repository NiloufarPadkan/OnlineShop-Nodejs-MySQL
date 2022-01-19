package io.github.shuoros.iec.model;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Client {

    @Id
    private String id;
    private String username;
    private String password;
    private List<String> roles;

}
