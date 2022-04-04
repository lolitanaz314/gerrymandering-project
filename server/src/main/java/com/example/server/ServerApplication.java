package com.example.server;

import com.example.server.model.StateCode;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
//		System.out.print(StateCode.TN);
//		System.out.print(StateCode.SC);
//		System.out.print(StateCode.CO);
	}
}
