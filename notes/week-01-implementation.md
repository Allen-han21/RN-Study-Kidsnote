# Week 01 구현 노트: 프로필 카드 앱

**날짜:** 2025-11-08
**과제:** useState를 활용한 프로필 편집 기능 구현
**프로젝트:** ProfileCardApp

---

## 📱 구현 개요

React Native CLI로 TypeScript 기반 프로필 카드 앱을 구현했습니다. 사용자가 자신의 이름, 직업, 소개를 보고 수정할 수 있는 간단한 앱입니다.

### 핵심 기능
- **View Mode**: 프로필 정보 표시
- **Edit Mode**: TextInput으로 정보 수정
- **State 관리**: useState로 edit mode 토글 및 데이터 관리

---

## 🛠️ 개발 환경 설정

### 설치한 도구
```bash
# React Native CLI (deprecated 제거 후 최신 방식 사용)
npm uninstall -g react-native-cli
npx @react-native-community/cli@latest init ProfileCardApp

# Watchman (파일 변경 감지)
brew install watchman

# CocoaPods 확인
pod --version  # 1.16.2
```

### 프로젝트 생성
```bash
cd ~/Dev/Repo/RN-Study-Kidsnote/projects
npx @react-native-community/cli@latest init ProfileCardApp
cd ProfileCardApp/ios && pod install
```

**주의사항:**
- React Native 0.82.1부터 TypeScript가 기본 템플릿
- `react-native-cli`는 deprecated, `@react-native-community/cli` 사용
- 첫 pod install은 35초 소요

---

## 💻 코드 구현

### 1. 프로젝트 구조
```
ProfileCardApp/
├── src/
│   └── components/
│       └── ProfileCard.tsx    # 프로필 카드 컴포넌트
├── App.tsx                     # 메인 앱 (ProfileCard 통합)
├── ios/                        # iOS 네이티브 코드
├── android/                    # Android 네이티브 코드
└── package.json
```

### 2. ProfileCard 컴포넌트 주요 로직

#### State 관리
```typescript
const [isEditMode, setIsEditMode] = useState(false);
const [profile, setProfile] = useState<ProfileData>({
  name: 'Allen Han',
  job: 'iOS Developer',
  bio: '...',
});
const [tempProfile, setTempProfile] = useState<ProfileData>(profile);
```

**설계 의도:**
- `profile`: 실제 저장된 프로필 데이터
- `tempProfile`: 편집 중인 임시 데이터
- `isEditMode`: View/Edit 모드 토글

#### Edit 모드 토글
```typescript
const handleEditToggle = () => {
  if (isEditMode) {
    // Save: tempProfile을 profile에 저장
    setProfile(tempProfile);
  } else {
    // Edit 시작: 현재 profile을 tempProfile로 복사
    setTempProfile(profile);
  }
  setIsEditMode(!isEditMode);
};
```

#### Cancel 기능
```typescript
const handleCancel = () => {
  setTempProfile(profile);  // 변경사항 버리기
  setIsEditMode(false);
};
```

---

## 🎨 UI 구현

### 조건부 렌더링
```typescript
{isEditMode ? (
  // Edit Mode: TextInput 표시
  <View style={styles.inputGroup}>
    <TextInput
      value={tempProfile.name}
      onChangeText={text => setTempProfile({...tempProfile, name: text})}
    />
  </View>
) : (
  // View Mode: Text 표시
  <View style={styles.infoRow}>
    <Text style={styles.value}>{profile.name}</Text>
  </View>
)}
```

### 스타일링 특징
- **Card Design**: 둥근 모서리(borderRadius: 16), 그림자 효과
- **iOS 스타일 컬러**:
  - 수정 버튼: `#007AFF` (iOS Blue)
  - 저장 버튼: `#34C759` (iOS Green)
- **다크 모드 지원**: `useColorScheme()` 훅 사용

---

## 📊 React Native vs SwiftUI 비교

### State 관리
| React Native | SwiftUI |
|--------------|---------|
| `useState` | `@State` |
| `setProfile(newData)` | `profile = newData` |
| Spread operator (`...profile`) | Struct copy |

### 조건부 렌더링
| React Native | SwiftUI |
|--------------|---------|
| `{condition ? <A /> : <B />}` | `if condition { A } else { B }` |
| JSX 내 삼항 연산자 | ViewBuilder |

### TextInput
| React Native | SwiftUI |
|--------------|---------|
| `<TextInput onChangeText={...} />` | `TextField("", text: $text)` |
| Controlled Component | Binding (`$`) |

**핵심 차이점:**
- React Native: **Controlled Components** (state를 직접 관리)
- SwiftUI: **Two-way Binding** (`$` 바인딩)

---

## 🐛 트러블슈팅

### 1. react-native-cli deprecated 오류
**문제:**
```
TypeError: cli.init is not a function
```

**해결:**
```bash
npm uninstall -g react-native-cli
npx @react-native-community/cli@latest init ProfileCardApp
```

### 2. .gitignore android/ios 제외 문제
**문제:** Expo 템플릿 기준으로 android/, ios/ 폴더가 .gitignore에 포함됨

**해결:**
```diff
- # @generated expo-cli sync-2b81b286409207a5da26e14c78851eb30d8ccbdb
- android/
- ios/
```
React Native CLI 방식에서는 네이티브 코드를 Git에 포함해야 함.

---

## ✅ 학습 성과

### 1. React Native 핵심 개념
- [x] `useState`로 상태 관리
- [x] Controlled Components 패턴
- [x] 조건부 렌더링 (`? :`)
- [x] Spread operator로 불변성 유지
- [x] StyleSheet API

### 2. 개발 환경
- [x] React Native CLI 프로젝트 생성
- [x] CocoaPods 설정
- [x] iOS 시뮬레이터 실행
- [x] Metro bundler 이해

### 3. iOS 개발자 관점
- [x] SwiftUI `@State` vs React Native `useState` 비교
- [x] UIKit `UITextField` vs React Native `TextInput` 비교
- [x] Declarative UI 공통점 이해

---

## 🚀 다음 단계

### Week 02 준비사항
- [ ] JSX 스타일링 심화 학습
- [ ] Flexbox 레이아웃 연습
- [ ] React Native StyleSheet vs CSS 비교

### 개선 아이디어
- [ ] 프로필 이미지 추가
- [ ] 입력 검증 (빈 값 체크)
- [ ] 저장 성공 Toast 메시지
- [ ] AsyncStorage로 데이터 영속성

---

## 📚 참고 자료

- [React Native 공식 문서](https://reactnative.dev/docs/getting-started)
- [React Hooks - useState](https://react.dev/reference/react/useState)
- [TypeScript React Native](https://reactnative.dev/docs/typescript)

---

**작성자:** Allen Han
**iOS 개발 경력:** Kidsnote
**목표:** React Native 실무 통합 역량 확보
