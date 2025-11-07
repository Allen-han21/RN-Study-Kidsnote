# Week 01: React Native 기초

## 📅 일정
- **날짜**: 2025-11-07
- **주제**: React Native 철학 및 기본 문법 이해
- **참여자**: 한동욱, 빈센트, 앨런, 데이즈, 카일

## 🎯 학습 목표
- React Native의 선언적 UI 철학 이해
- 기본 문법 학습
- useState를 활용한 상태 관리
- 리렌더링 개념 이해
- 플랫폼별 차이 인식

## 📚 주요 개념

### 1. 선언적 UI 철학
```
UI = f(state)
```
- 상태가 바뀌면 UI가 자동으로 업데이트
- React Native, SwiftUI, Jetpack Compose 모두 동일한 개념
- 명령형(Imperative) → 선언형(Declarative) 패러다임 전환

**비교:**
```swift
// SwiftUI (선언형)
@State private var name = "Allen"
Text(name)

// UIKit (명령형)
let label = UILabel()
label.text = name
```

```javascript
// React Native (선언형)
const [name, setName] = useState('Allen');
<Text>{name}</Text>
```

### 2. Expo vs React Native CLI

#### Expo
- **장점**: 빠른 시작, 간편한 설정
- **단점**: 제한된 네이티브 모듈 접근
- **용도**: 학습, 프로토타입, 간단한 앱

#### React Native CLI
- **장점**: 완전한 네이티브 통합, 자유로운 커스터마이징
- **단점**: 복잡한 초기 설정
- **용도**: 실무 프로젝트, 기존 네이티브 앱 통합

**스터디 선택**: CLI (실무 통합을 위해)

### 3. TypeScript vs JavaScript

| 특징 | JavaScript | TypeScript |
|------|-----------|-----------|
| 타입 안정성 | ❌ | ✅ |
| Swift 유사성 | 낮음 | 높음 |
| 학습 곡선 | 낮음 | 중간 |
| 실무 권장 | - | ✅ |

**스터디 선택**: TypeScript (Swift 개발자에게 친숙)

### 4. 환경 설정

#### 필수 도구
- ✅ Node.js (LTS 버전)
- ✅ Xcode (iOS 개발)
- ✅ Android Studio (Android 개발)
- ✅ VSCode (추천 에디터)
- ✅ Git

#### 설치 명령어
```bash
# Node.js 설치 확인
node --version
npm --version

# React Native CLI 설치
npm install -g react-native-cli

# iOS 의존성 (macOS only)
cd ios && pod install

# Android 설정
# Android Studio에서 SDK 설치
```

## 💻 실습

### 과제: 프로필 카드 만들기

#### 요구사항
1. 이름, 나이, 이메일 표시
2. "Edit Mode" 토글 기능
3. Edit Mode에서 정보 수정 가능
4. 저장 버튼으로 변경사항 적용

#### 기본 구조
```typescript
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ProfileCard = () => {
  const [name, setName] = useState('Allen');
  const [age, setAge] = useState('30');
  const [email, setEmail] = useState('allen@kidsnote.com');
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <View style={styles.container}>
      {/* 여기에 UI 구현 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default ProfileCard;
```

#### 힌트
- `TextInput`의 `editable` prop 활용
- 버튼으로 `isEditMode` 상태 토글
- 조건부 렌더링으로 Edit/Save 버튼 변경

### 선택 과제: RN vs SwiftUI 비교

#### 비교 항목
1. 문법 유사성
2. 상태 관리 방식
3. 스타일링 방법
4. 컴포넌트 구조
5. 개발자 경험

## 📖 추천 학습 자료

### 공식 문서
- [React Native 공식 문서](https://reactnative.dev/)
- [React 공식 문서](https://react.dev/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)

### 추천 영상
- [React Native for Beginners](https://www.youtube.com/results?search_query=react+native+tutorial)
- [TypeScript in 100 Seconds](https://www.youtube.com/watch?v=zQnBQ4tB3ZA)

### 추천 도구
- React Native Debugger
- Flipper
- React DevTools

## 🤔 토론 주제

1. **RN 도입 시 장단점**
   - 장점: 빠른 개발, 코드 재사용, 핫 리로드
   - 단점: 네이티브 대비 성능, 플랫폼별 이슈

2. **Kidsnote 적용 가능성**
   - 어떤 화면에 적용할 수 있을까?
   - 리스크는 무엇인가?
   - OTA 업데이트의 실효성은?

3. **CodePush 활용 방안**
   - 문구 수정
   - UI 개선
   - A/B 테스팅

## 📝 다음 주 준비사항

### 다음 주제: JSX와 스타일링
- CSS-in-JS 개념
- StyleSheet API
- Flexbox 레이아웃
- Tailwind RN (선택)

### 사전 학습
- Flexbox 기본 개념 복습
- CSS 기본 문법 리뷰

### 과제
- 프로필 카드 완성 및 공유
- (선택) RN vs SwiftUI 비교 문서 작성

## 💡 Tips

1. **개발 환경 팁**
   - Fast Refresh 활성화로 빠른 피드백
   - Hot Reloading vs Fast Refresh 차이 이해
   - ESLint + Prettier 설정 권장

2. **디버깅 팁**
   - `console.log()` 적극 활용
   - React DevTools로 컴포넌트 트리 확인
   - Network 탭에서 API 요청 모니터링

3. **학습 팁**
   - 작은 컴포넌트부터 시작
   - 공식 문서를 먼저 참고
   - 에러 메시지를 꼼꼼히 읽기

## 📌 참고 링크

- [React Native 환경 설정](https://reactnative.dev/docs/environment-setup)
- [TypeScript React Native 템플릿](https://github.com/react-native-community/react-native-template-typescript)
- [Expo vs CLI 비교](https://docs.expo.dev/introduction/why-not-expo/)

---

**다음 세션**: Week 02 - JSX와 스타일링
