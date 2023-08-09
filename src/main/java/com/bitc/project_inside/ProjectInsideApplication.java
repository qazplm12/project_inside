package com.bitc.project_inside;

import org.openqa.selenium.By;
import org.openqa.selenium.PageLoadStrategy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.Duration;
import java.util.List;

@SpringBootApplication
public class ProjectInsideApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectInsideApplication.class, args).getBean(ProjectInsideApplication.class).test();
    }

    public void test() {
        System.out.println("================크롤링 시작================");
        //세션 시작
        ChromeOptions options = new ChromeOptions();
        //페이지가 로드될 때까지 대기
        //Normal: 로드 이벤트 실행이 반환 될 때 까지 기다린다.
        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
//        options.addArguments("headless");   // 창 없이 실행
        options.addArguments("--remote-allow-origins=*");

        // 웹드라이버
        WebDriver driver = new ChromeDriver(options);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); // 대기 시간을 10초로 설정

        try {
            // 코드실행기 페이지
            driver.get("https://qna.programmers.co.kr/code_runners");   // 컴포넌트 주소를 주면 되려나

            Select selectOptions = new Select(driver.findElement(By.className("selectpicker")));

            while(true) {
                selectOptions.getFirstSelectedOption();
                System.out.println("언어셀렉트 : " + selectOptions.getFirstSelectedOption().getText());  // 굿

                List<WebElement> tags = driver.findElements(By.className("CodeMirror-line"));   // 가져올때는 이대로 가져와서 사용해도 될듯
                for(int i = 0; i < tags.size(); i++) {
                    System.out.println("코드 : " + tags.get(i).getText());
                }

                driver.findElement(By.id("output")).findElement(By.className("guide"));
                System.out.println("아웃풋 : " + driver.findElement(By.id("output")).findElement(By.className("guide")).getText());   // 굿

//                // 대기 시간 설정 (값이 변할 때마다 반복 주기)
//                Thread.sleep(5000); // 5초 대기

//                // 페이지를 새로고침하여 값이 변경되었는지 확인
//                driver.navigate().refresh();
            }

        }
//        catch (InterruptedException e) {
//            e.printStackTrace();
//        }
        finally {
//            driver.quit();
        }
    }
}