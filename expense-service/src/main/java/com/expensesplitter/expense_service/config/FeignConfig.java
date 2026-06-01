package com.expensesplitter.expense_service.config;

import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Configuration
public class FeignConfig {

    @Bean
    public RequestInterceptor requestInterceptor() {

        return template -> {

            ServletRequestAttributes attributes =
                    (ServletRequestAttributes)
                            RequestContextHolder
                                    .getRequestAttributes();

            if (attributes == null) {
                return;
            }

            String authorization =
                    attributes.getRequest()
                            .getHeader("Authorization");

            if (authorization != null) {

                template.header(
                        "Authorization",
                        authorization
                );
            }
        };
    }
}