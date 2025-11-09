# Android 개발 환경 설정

**날짜:** 2025-11-10
**목적:** React Native Android 앱 개발 환경 구축

---

## 📱 설정 개요

ProfileCardApp을 Android 에뮬레이터에서 실행하기 위한 환경 설정

### 설치된 도구
- **Android Studio**: Ladybug 2024.2.1 Patch 2
- **Android SDK**: API Level 36 (Android API 36)
- **Build Tools**: 34.0.0, 35.0.0, 36.0.0
- **NDK**: 27.1.12297006
- **CMake**: 3.22.1
- **Java**: OpenJDK 17.0.13 (Zulu)

---

## 🛠️ 설정 단계

### 1. Android Studio 설치

이미 설치되어 있음:
```bash
/Applications/Android Studio.app
```

### 2. 권한 문제 해결

Google 디렉토리 소유자 변경:
```bash
sudo chown -R allen:staff ~/Library/Application\ Support/Google
```

### 3. Android Studio 초기 설정

1. **Data Sharing**: Don't send (선택)
2. **Setup Wizard**: Standard 설치
3. **SDK 자동 다운로드 및 설치**

설치된 SDK 구성 요소:
- Android SDK Platform 36 (API Level 36)
- Android SDK Build-Tools
- Android Emulator
- Android SDK Platform-Tools
- NDK (Side by side)
- CMake

### 4. 환경 변수 설정

**~/.zshrc에 추가:**
```bash
# Android SDK (for React Native development)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

**적용:**
```bash
source ~/.zshrc
```

**확인:**
```bash
echo $ANDROID_HOME
# /Users/allen/Library/Android/sdk

which adb
# /opt/homebrew/bin/adb (또는 $ANDROID_HOME/platform-tools/adb)
```

### 5. Android 에뮬레이터 생성

**Virtual Device Manager에서 생성:**
- **Device**: Pixel 7
- **System Image**: API 36 (Google Play)
- **ABI**: arm64-v8a (Apple Silicon 최적화)
- **AVD Name**: Pixel_7_API_36

**추가로 생성된 에뮬레이터:**
- Medium_Phone_API_36

**에뮬레이터 목록 확인:**
```bash
~/Library/Android/sdk/emulator/emulator -list-avds
```

### 6. local.properties 파일 생성

**경로:** `projects/ProfileCardApp/android/local.properties`

**내용:**
```properties
sdk.dir=/Users/allen/Library/Android/sdk
```

**주의:** 이 파일은 `.gitignore`에 포함되어 Git에서 제외됨

---

## 🚀 React Native Android 앱 실행

### 에뮬레이터 시작
```bash
~/Library/Android/sdk/emulator/emulator -avd Pixel_7_API_36 -no-snapshot-load &
```

### 연결 확인
```bash
adb devices
# emulator-5554    device
```

### 앱 빌드 및 실행
```bash
cd ~/Dev/Repo/RN-Study-Kidsnote/projects/ProfileCardApp
npx react-native run-android
```

**빌드 시간:** 약 3분 (첫 빌드)

**결과:**
```
BUILD SUCCESSFUL in 3m 10s
Installed on 1 device.
Starting the app on "emulator-5554"...
```

---

## ✅ 실행 확인

### 앱 화면
- ✅ 프로필 카드 제목
- ✅ 프로필 아바타 (파란색 원형, 첫 글자)
- ✅ 이름, 직업, 소개 표시
- ✅ 수정 버튼
- ✅ 편집 모드 (입력 검증 포함)
- ✅ AsyncStorage 데이터 영속성

### iOS vs Android 동작
- 모든 기능이 iOS와 동일하게 작동
- UI/UX 일관성 유지
- React Native의 크로스 플랫폼 장점 확인

---

## 🐛 트러블슈팅

### 1. Android Studio 시작 실패
**문제:**
```
java.nio.file.AccessDeniedException: /Users/allen/Library/Application Support/Google/AndroidStudio2024.2
```

**해결:**
```bash
sudo chown -R allen:staff ~/Library/Application\ Support/Google
```

Google 디렉토리의 소유자가 `root`로 되어 있어서 발생. 소유자를 사용자로 변경.

### 2. SDK location not found
**문제:**
```
SDK location not found. Define a valid SDK location with an ANDROID_HOME environment variable
or by setting the sdk.dir path in your project's local properties file
```

**해결:**
`android/local.properties` 파일 생성:
```properties
sdk.dir=/Users/allen/Library/Android/sdk
```

### 3. No emulators found
**문제:**
```
error Failed to launch emulator. Reason: No emulators found as an output of `emulator -list-avds`.
```

**해결:**
1. Android Studio에서 Virtual Device Manager로 에뮬레이터 생성
2. 수동으로 에뮬레이터 시작:
```bash
~/Library/Android/sdk/emulator/emulator -avd Pixel_7_API_36 -no-snapshot-load &
```

---

## 📊 React Native 크로스 플랫폼 비교

### iOS
- 플랫폼: iPhone 15 Pro (iOS 17.2)
- 빌드 도구: Xcode, CocoaPods
- 실행: `npx react-native run-ios`

### Android
- 플랫폼: Pixel 7 API 36 (Android API 36)
- 빌드 도구: Gradle, Android Studio
- 실행: `npx react-native run-android`

### 공통점
- **단일 코드베이스**: `src/components/ProfileCard.tsx` 하나로 양쪽 플랫폼 지원
- **UI 일관성**: StyleSheet로 동일한 디자인 구현
- **상태 관리**: useState, useEffect 동일하게 작동
- **데이터 영속성**: AsyncStorage로 양쪽 플랫폼 모두 지원

---

## 📚 학습 포인트

### 1. Android 개발 환경
- Android Studio, SDK, NDK, CMake 이해
- 에뮬레이터 생성 및 관리
- adb (Android Debug Bridge) 사용법

### 2. React Native 빌드 프로세스
- Gradle 빌드 시스템
- 네이티브 모듈 컴파일 (C++)
- APK 생성 및 설치

### 3. 크로스 플랫폼 개발
- "Learn once, write anywhere" 철학
- 플랫폼별 차이점 최소화
- 공통 컴포넌트로 효율적인 개발

---

## 🎯 다음 단계

- [ ] Week 02: JSX 스타일링 심화 학습
- [ ] Android 실기기 테스트
- [ ] 플랫폼별 UI 차이점 탐구
- [ ] Android 배포 (APK/AAB) 학습

---

**작성자:** Allen Han
**iOS 개발 경력:** Kidsnote
**목표:** React Native 크로스 플랫폼 개발 역량 확보
