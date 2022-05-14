package com.example.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//import com.example.server.json.User;
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//
//import java.io.File;
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.List;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	/*
	// 1. Change service class
	// 2. Change reference type
	// 3. Change file path to read
	 */

//	@Bean
//	CommandLineRunner runner(UserService service){	// 1. Change service class
//		return args -> {
//			ObjectMapper mapper = new ObjectMapper();
//			// 2. Change reference type
//			TypeReference<List<User>> typeReference = new TypeReference<List<User>>(){};
//			// 3. Change file path to read
//			InputStream inputStream = TypeReference.class.getResourceAsStream("/json/users.json");
//
//			try {
//				List<User> lists = mapper.readValue(inputStream,typeReference);
////				for (User list: lists){
////					System.out.println("\n" + list.getCoordinates());
////					for (Object o: list.getCoordinates()) {
////						System.out.print(o.toString() + " ");
////					}
////				}
////				service.save(lists); // Temporary
//				System.out.println("Input success!");
//			} catch (IOException e){
//				System.out.println("Unable to save input: " + e.getMessage());
//			}
//		};
//	}
}
