package com.bitc.project_inside.controller;

import com.bitc.project_inside.data.entity.*;
import com.bitc.project_inside.service.LeeService;
import com.bitc.project_inside.service.SimService;
import lombok.RequiredArgsConstructor;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/server")
public class LeeController {

    private final LeeService leeService;
    private final SimService simService;
    private final ResourceLoader resourceLoader;

    // 암호 생성 객체
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 문제 리스트
    @RequestMapping(value = "/challengeList", method = RequestMethod.GET)
    public Object selectChallengeList(
            @RequestParam(value = "userNick") String userNick,
            @RequestParam(value = "challengeClass") int challengeClass,
            @RequestParam(value = "solvedState") int solvedState
    ) throws Exception { // 9는 아무런 값 없는것임
        List<ChallengeEntity> challenge = null;

        if (challengeClass == 9 && solvedState != 9) {
            challenge = leeService.selectChallengeListSolvedState(userNick, solvedState);
        } else if (challengeClass != 9 && solvedState == 9) {
            challenge = leeService.selectChallengeListClass(challengeClass);
        } else if (challengeClass != 9 && solvedState != 9) {
            challenge = leeService.selectChallengeListClassSolvedState(userNick, challengeClass, solvedState);
        } else {
            challenge = leeService.selectChallengeList();
        }

        return challenge;
    }

    // 문제 푼 상태
    @RequestMapping(value = "/challengeListState", method = RequestMethod.GET)
    public Object selectChallengeListState(@RequestParam(value = "userNick") String userNick) throws Exception {
        List<Integer> solved = leeService.selectChallengeState(userNick);
        return solved;
    }

    // 문제 정보 호출
    @RequestMapping(value = "/challenge", method = RequestMethod.GET)
    public Object selectChallenge(@RequestParam(value = "idx") int idx) throws Exception {
        ChallengeEntity challenge = leeService.selectChallenge(idx);    // DTO 말고 Entity 사용할 것
        return challenge;
    }

    // 크롤링
    @RequestMapping(value = "/challenge", method = RequestMethod.POST)
    public String codeRunner(@RequestBody Map<String, String> requestData) {
        System.out.println("================크롤링 시작================");

        String language = requestData.get("language");
        String code = requestData.get("code");

        System.out.println("언어 : " + requestData.get("language"));
        System.out.println("코드 : " + requestData.get("code"));

        //세션 시작
        ChromeOptions options = new ChromeOptions();
        //페이지가 로드될 때까지 대기
        //Normal: 로드 이벤트 실행이 반환 될 때 까지 기다린다.
        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
//        options.addArguments("--window-size=1920,1080"); // 원하는 크기로 설정
        options.addArguments("--headless");   // 창 없이 실행
//        options.addArguments("--disable-extensions"); // 확장 프로그램 비활성화
//        options.addArguments("--disable-dev-shm-usage"); // 공유 메모리 사용 비활성화
//        options.addArguments("--remote-allow-origins=*");
        // 확장프로그램 zip 파일 경로(확장프로그램 활성화 시 headless 불가, 안되는게 있을땐 불필요한 기능 천천히 지워보기)
//        String extensionPath = "src/main/project_inside_react/src/chromeDriver/gleekbfjekiniecknbkamfmkohkpodhe.zip";
//        options.addExtensions(new File(extensionPath));

        // 웹드라이버(java)(서순 중요)
        WebDriver driver = new ChromeDriver(options);
//        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); // 대기 시간을 10초로 설정
        // 코드실행기 페이지
        driver.get("https://wandbox.org/");   // 컴파일 페이지
//        driver.get("http://localhost:3000/iframe");   // iframe 주소는 컴파일 페이지가 계속 바뀔때 사용
        // 대기 설정
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        // iframe id를 이용해 iframe으로 프레임 전환
//        driver.switchTo().frame(driver.findElement(By.id("iframe")));
        // 반환받을 변수
        String result = "";

        try {
            // 해쉬코드
//            Select selectOptions = new Select(driver.findElement(By.className("selectpicker")));
//            System.out.println("기본 셀렉트옵션 : " + selectOptions.getFirstSelectedOption().getText());
//
//            selectOptions.selectByVisibleText(language);  // 언어 정보 선택
//            System.out.println("변경 셀렉트옵션 : " + driver.findElement(By.className("filter-option")));  // 굿
//
//
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
//            WebElement codeMirror = driver.findElement(By.className("CodeMirror-line"));
////            WebElement codeMirror = driver.findElement(By.cssSelector("#editor > textarea"));
//            WebElement codeMirrorr = wait.until(ExpectedConditions.elementToBeClickable(By.className("CodeMirror-line")));
//
//
//            codeMirrorr.click();    // 코드 실행창 기존 내용 지우기 --이까지 실행됨(내가 정하는 html 코드 에따라 실행의정도가 다름 아마 텍스트가 진짜로 입력이 되는 태그가 있을 건데 그걸 찾아야 하는듯, 입력이나 삭제 이벤트가 안먹는게 아니라 태그가 적절치 않은건가)
//            codeMirrorr.sendKeys(Keys.chord(Keys.LEFT_CONTROL + "a"));
////            codeMirror.clear();    //
//            codeMirrorr.sendKeys(code);
//            System.out.println("코드 : " + codeMirrorr);  // 코드 내용 입력
//


////            List<WebElement> tags = driver.findElements(By.className("CodeMirror-line"));   // 가져올때는 이대로 가져와서 사용해도 될듯
////            for(int i = 0; i < tags.size(); i++) {
////                System.out.println("코드 : " + tags.get(i).getText());
////            }
//
////                String outputGuide = driver.findElement(By.id("output")).findElement(By.className("guide")).getText();
////                System.out.println("아웃풋 : " + driver.findElement(By.id("output")).findElement(By.className("guide")).getText());   // 굿
//
//
//            WebElement output = driver.findElement(By.id("output"));
//            System.out.println("아웃풋 부모 : " + output);
//
//            driver.findElement(By.id("run")).click();   // 코드 실행
//
////                System.out.println("Test : " + output.findElement(By.className("console-wall-time")).getText().length());
//
//            if (output.findElement(By.className("console-wall-time")).getText().length() == 17) {
//                String outputGuide = driver.findElement(By.id("output")).findElement(By.className("guide")).getText();
//                System.out.println("가이드 : " + driver.findElement(By.id("output")).findElement(By.className("guide")).getText());   // 굿
//            } else {
//                String pre = driver.findElement(By.id("output")).findElement(By.className("console-content")).getText();
//                System.out.println("아웃풋 : " + pre);
//            }
//
////                // 대기 시간 설정 (값이 변할 때마다 반복 주기)
////                wait.until(ExpectedConditions.stalenessOf(outputGuide));
////            Thread.sleep(5000); // 5초 대기 (사실상 뷰가 생기며 필요 없어짐)
//
//            // 페이지를 새로고침하여 값이 변경되었는지 확인
////                driver.navigate().refresh();


            // 완드박스
            List<WebElement> btnLang = driver.findElements(By.className("list-group-item"));
            WebElement cm = driver.findElement(By.className("cm-activeLine"));

            cm.click(); // 코드 입력창 클릭
            cm.sendKeys(code);  // 코드 입력

            for (WebElement i : btnLang) {
                String btnLangText = i.getText();
                if (btnLangText.equals(language)) {
                    i.click();  // 언어 선택

                    WebElement btnRun = driver.findElement(By.cssSelector("#wb-main-content > div.d-flex.flex-column.flex-md-row.gap-16px > div.flex-grow-1.d-flex.flex-column.gap-8px > div:nth-child(4) > button"));
                    btnRun.click(); // 실행버튼 클릭

                    result = driver.findElement(By.cssSelector("#wb-result-console > pre")).getText();
                    System.out.println("아웃풋 : " + result); // 결과 받아오기

                    break;
                }
            }
        } finally {
            driver.quit();
        }
        return result;
    }

    // 문제 제출(채점)
    @RequestMapping(value = "/challengeScoring", method = RequestMethod.GET)
    public Object scoring(@RequestParam(value = "idx") int idx) throws Exception {
        List<ScoringEntity> scoring = leeService.selectScoring(idx);
        return scoring;
    }

    // 문제 오답일때(중복 정보 입력 가능)
    @RequestMapping(value = "/challengeWrong", method = RequestMethod.POST)
    public void wrong(@RequestParam(value = "userNick") String userNick, @RequestParam(value = "idx") int idx) throws Exception {
        leeService.saveScoringLogWrong(userNick, idx);
        leeService.updateChallenge(idx);
    }

    // 문제 정답일때(최초 정보 입력 가능)
    @RequestMapping(value = "/challengeCorrect", method = RequestMethod.POST)
    public void correct(@RequestBody Map<String, String> requestData) throws Exception {
        String userNick = requestData.get("userNick");
        int idx = Integer.parseInt(requestData.get("idx"));
        String language = requestData.get("language");
        String code = requestData.get("code");
        int score = Integer.parseInt(requestData.get("score"));
        // 같은 사람이 같은 문제를 같은 언어로 풀면 save, update 안됨
        boolean solved = leeService.selectSolvedChallenge(userNick, idx, language);
//        System.out.println(solved);
        if (solved) {

        } else {
            leeService.saveSolved(userNick, idx, language, code);
            leeService.saveScoringLogCorrect(userNick, idx);
            leeService.updateChallenge(idx);
            leeService.levelExp(score, userNick); // 경험치 추가
        }
    }

    // 풀이법 리스트 가져오기
    @RequestMapping(value = "/solvedList", method = RequestMethod.GET)
    public List<SolvedEntity> solvedList(@RequestParam(value = "idx") int idx) throws Exception {
        return leeService.selectSolvedList(idx);
    }

    // 질문 리스트 가져오기
    @RequestMapping(value = "/QnAList", method = RequestMethod.GET)
    public List<QuestionEntity> selectQnAList(@RequestParam(value = "idx") int idx) throws Exception {
        return leeService.selectQnAList(idx);
    }

    // 답변 리스트 가져오기
    @RequestMapping(value = "/QnAItems", method = RequestMethod.GET)
    public List<AnswerEntity> selectQnAItems(@RequestParam(value = "idx") int idx) throws Exception {
        return leeService.selectQnAItems(idx);
    }

    // 질문하기
    @RequestMapping(value = "/Question", method = RequestMethod.POST)
    public void qnaQuestion(@RequestBody Map<String, String> requestData) throws Exception {
        int idx = Integer.parseInt(requestData.get("idx"));
        String userNick = requestData.get("userNick");
        String language = requestData.get("language");
        String code = requestData.get("code");
        String title = requestData.get("title");
        String content = requestData.get("content");

        leeService.saveQuestion(idx, userNick, language, code, title, content);
    }

    // 답변하기
    @RequestMapping(value = "/Answer", method = RequestMethod.POST)
    public void qnaAnswer(@RequestBody Map<String, String> requestData) throws Exception {
        int idx = Integer.parseInt(requestData.get("idx")); // 질문 번호
        int challengeIdx = Integer.parseInt(requestData.get("challengeIdx"));   // 문제 번호
        String challengeTitle = requestData.get("challengeTitle");
        String userNick = requestData.get("userNick");  // 답변한 사람 닉
        String questionNick = requestData.get("questionNick");
        String language = requestData.get("language");
        String code = requestData.get("code");
        String content = requestData.get("content");

        // 알림 넣기
        simService.makeAlarm(questionNick, challengeTitle, userNick, "question", String.valueOf(challengeIdx));

        leeService.saveAnswer(idx, userNick, language, code, content);
        leeService.updateAnswerCount(idx);
    }

    // 문제 작성하기
    @RequestMapping(value = "/challengeWrite", method = RequestMethod.POST)
    public void saveChallenge (@RequestBody Map<String, String> requestData) throws Exception {
        String title = requestData.get("title");
        String explain = requestData.get("explain");
        String limit = requestData.get("limit");
        String paramExample = requestData.get("paramExample");
        String solutionExample = requestData.get("solutionExample");
        String javaCode = requestData.get("javaCode");
        String javaScriptCode = requestData.get("javaScriptCode");
        String pythonCode = requestData.get("pythonCode");
        int challengeClass = Integer.parseInt(requestData.get("challengeClass"));

        leeService.saveChallenge(title, explain, limit, paramExample, solutionExample, javaCode, javaScriptCode, pythonCode, challengeClass);
    }

//    String uploadDir = "src/main/project_inside_react/public/images/challengeImg";  // 업로드 할 위치
//    // 문제 입력
//    @RequestMapping(value = "/challengeWrite", method = RequestMethod.POST)
//    public ResponseEntity<Object> saveChallenge (MultipartFile[] multipartFiles) {
//        try {
//            MultipartFile file = multipartFiles[0];
//
//            String fileId = new SimpleDateFormat("yyyyMMdd_HmsS").format(new Date());
//            String originName = file.getOriginalFilename();
//            String fileExtension = originName.substring(originName.lastIndexOf(".") + 1);
//            originName = originName.substring(0, originName.lastIndexOf("."));
//            long fileSize = file.getSize();
//
//            File fileSave = new File(uploadDir + fileId + "." + fileExtension);
//            if (!fileSave.exists()) {
//                fileSave.mkdirs();
//            }
//            file.transferTo(fileSave);
//            return new ResponseEntity<Object>("http://localhost:8080/getImage/" + fileId + "/" + fileExtension, HttpStatus.OK);
//    } catch (IOException e) {
//            return new ResponseEntity<Object>(null, HttpStatus.CONFLICT);
//        }
//    }

    @RequestMapping(value = "/totalChallenge", method = RequestMethod.GET)
    public int totalChallenge(@RequestParam(value = "userNick") String userNick) throws Exception {
        return leeService.countTotalChallenge(userNick);
    }

    // 랭킹 유저 이름
    @RequestMapping(value = "/userRank", method = RequestMethod.GET)
    public List<String> userRank() throws Exception {
        return leeService.userRank();
    }

    // 랭킹 순위
    @RequestMapping(value = "/numRank", method = RequestMethod.GET)
    public List<Integer> numRank() throws Exception {
        return leeService.numRank();
    }

    // 비로그인 시 토이프로젝트 정보
    @RequestMapping(value = "/toyAnnony", method = RequestMethod.GET)
    public ProjectEntity toyAnnony() throws Exception {
        return leeService.selectToyAnnony();
    }

    // 로그인 시 토이프로젝트 정보
    @RequestMapping(value = "/toyUser", method = RequestMethod.GET)
    public List<ProjectEntity> toyUser(@RequestParam(value = "language") String language) throws Exception {
        String[] words = language.split(", ");
//        System.out.println("잘려진 문자열 : " + words);

        List<ProjectEntity> project = new ArrayList<>();
        for (String i : words) {
            project.addAll(leeService.selectToyUser(i));
        }

//        System.out.println("합쳐진 : " + project);
        return project;
    }

    // 유저 정보 가져오기
    @RequestMapping(value = "/userProfile", method = RequestMethod.GET)
    public List<PersonEntity> userProfile() throws Exception {
        return leeService.selectUserProfile();
    }

    @RequestMapping(value = "/questionDetail", method = RequestMethod.GET)
    public QuestionEntity questionDetail(@RequestParam(value = "idx") int idx) throws Exception {
        return leeService.selectQuestionDetail(idx);
    }

    @RequestMapping(value = "/userDetail", method = RequestMethod.GET)
    public PersonEntity userDetail(@RequestParam(value = "userId") String userId) throws Exception {
        return leeService.selectUserDetail(userId);
    }

    // =============================================================================================== 프로젝트
    @RequestMapping(value = "/matching", method = RequestMethod.GET)
    public List<MatchingEntity> pmInfo(@RequestParam(value = "idx") int idx) throws Exception {
        return leeService.selectMatching(idx);  // 프로젝트 번호
    }

    @RequestMapping(value = "todoDelete", method = RequestMethod.DELETE)
    public void todoDelete(@RequestParam(value = "idx") int idx) throws Exception{
        System.out.println("=====0idx0===== : " + idx);
        leeService.deleteTodo(idx);
    }
}
