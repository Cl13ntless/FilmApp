FROM openjdk:17-jdk-alpine
ARG JAR_FILE=target/movieDB-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
COPY src/main/resources/movies_metadata.csv .
ENTRYPOINT ["java","-jar","/app.jar"]