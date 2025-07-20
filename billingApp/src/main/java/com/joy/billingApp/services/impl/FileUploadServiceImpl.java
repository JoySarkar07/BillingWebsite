package com.joy.billingApp.services.impl;

import com.joy.billingApp.services.FileUploadService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileUploadServiceImpl implements FileUploadService {

    @Value("${upload.dir}")
    private String uploadDir;

    @Override
    public String uploadFile(MultipartFile file){
        Path uploadPath = Paths.get(uploadDir);
        try{
            if(!Files.exists(uploadPath)){
                Files.createDirectories(uploadPath);
            }

            String filename = System.currentTimeMillis()+"_"+file.getOriginalFilename();
            Path filePath = uploadPath.resolve(filename);
            String url = "http://localhost:8081/api/v1.0/uploads/"+filename;

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return url;
        }catch(IOException e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occured while uploading file");
        }
    }

    @Override
    public boolean deleteFile(String url) {
        String file = url.split("/uploads/")[1];
        Path filePath = Paths.get(uploadDir).resolve(file);
        try{
            return Files.deleteIfExists(filePath);
        }
        catch(IOException e){
            return false;
        }
    }
}
