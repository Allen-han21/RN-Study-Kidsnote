# RN-Study-Kidsnote

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)

> iOS 네이티브 개발자 중심 React Native 학습 및 Kidsnote 앱 RN 모듈 통합 검증 프로젝트

## 📘 프로젝트 개요

**RN-Study-Kidsnote**는 iOS 네이티브 개발자들이 React Native를 학습하고, 기존 네이티브 앱(Kidsnote)에 RN 모듈을 통합하는 가능성을 검증하기 위한 스터디 프로젝트입니다.

단순히 이론을 배우는 것이 아니라, **실제 업무 수준에서 RN을 적용할 수 있는 구조**를 실험하는 것을 목표로 합니다.

## 🎯 목적

### 단기 목표
- RN의 기본 문법, 상태 관리, 선언적 UI 철학 이해
- 간단한 메모앱 / 프로필앱 제작

### 중기 목표
- RN을 Kidsnote 앱 내 특정 화면에 임베딩하여 통합 가능성 검증

### 장기 목표
- OTA(Over-the-Air) 업데이트, CodePush를 통한 무배포 배포 구조 실험
- **"앱 배포 없이 UI/문구 수정 가능한 Kidsnote 하이브리드 구조"** 구현

## 👥 참여자

- 한동욱
- 빈센트
- 앨런
- 데이즈
- 카일

## 🛠️ 기술 스택

| 구분 | 기술 |
|------|------|
| **언어** | TypeScript, JavaScript |
| **프레임워크** | React Native |
| **런타임/빌드** | Node.js, Metro, Expo (초기 학습용) |
| **플랫폼** | iOS, Android |
| **패키지 관리** | npm 또는 yarn |
| **개발 도구** | Xcode, Android Studio, VSCode, Git |
| **선택적 확장** | CodePush, REST API (공공데이터/BR API) |

## 🎓 학습 포인트

### 1. 선언적 UI 철학
```
UI = f(state)
```
상태가 바뀌면 UI가 자동 업데이트 된다
- React Native, SwiftUI, Jetpack Compose 모두 동일한 개념

### 2. Expo vs CLI
- **Expo**: 빠른 시작용, 제한된 환경
- **React Native CLI**: 실무에서 네이티브 통합 시 필수

### 3. 언어 선택
- JavaScript + **TypeScript** 병행 (TS 권장)
- 타입 안정성과 Swift와의 유사성 때문에 TypeScript 선호

## 📅 스터디 진행

### 1주차: React Native 기초
- **학습 목표**: React Native 철학 및 기본 문법 이해
- **주요 개념**: 선언적 UI, useState, 리렌더링, 플랫폼별 차이
- **과제**: 프로필 카드 컴포넌트 만들기
  - 이름, 나이, 이메일 표시
  - "Edit Mode" 토글 기능 구현
- **선택 과제**: RN vs SwiftUI 비교 문서 작성
- **다음 주제**: JSX와 스타일링 (CSS-in-JS, StyleSheet, Tailwind RN 등)

## 🚀 시작하기

### 환경 설정

```bash
# Node.js 설치 확인
node --version
npm --version

# React Native CLI 설치
npm install -g react-native-cli

# 또는 Expo CLI 설치 (초기 학습용)
npm install -g expo-cli
```

### 프로젝트 생성

```bash
# React Native CLI 사용
npx react-native init MyApp --template react-native-template-typescript

# 또는 Expo 사용
npx create-expo-app MyApp --template
```

### iOS 실행

```bash
# iOS 시뮬레이터
npx react-native run-ios

# 또는 Expo
npm start
# i 키로 iOS 시뮬레이터 실행
```

### Android 실행

```bash
# Android 에뮬레이터
npx react-native run-android

# 또는 Expo
npm start
# a 키로 Android 에뮬레이터 실행
```

## 📖 학습 자료

- [React Native 공식 문서](https://reactnative.dev/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
- [Expo 문서](https://docs.expo.dev/)
- [CodePush 문서](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/)

## 📂 프로젝트 구조

```
RN-Study-Kidsnote/
├── docs/              # 스터디 자료 및 메모
│   └── week-01.md     # 1주차 학습 내용
├── examples/          # 예제 코드
│   └── profile-card/  # 프로필 카드 예제
├── notes/             # 개인 학습 노트
└── projects/          # 실습 프로젝트
    └── memo-app/      # 메모 앱 프로젝트
```

## 🤝 기여 방법

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가
chore: 설정 변경
```

## 📄 License

This project is for educational purposes only.

## 🔗 관련 프로젝트

- [Kidsnote iOS](https://github.com/kidsnote/kidsnote_ios)

---

**Made with ❤️ by iOS Developers learning React Native**
