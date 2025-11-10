# React Native Week 01 실습 여정
## Claude Code와 함께한 프로필 카드 앱 개발

**발표자:** Allen Han
**대상:** Claude Code 초보자
**날짜:** 2025-11-10

---

## 📚 목차

1. [Claude Code란?](#1-claude-code란)
2. [환경 설정](#2-환경-설정)
3. [Week 01 기본 구현](#3-week-01-기본-구현)
4. [Week 01 개선하기](#4-week-01-개선하기)
5. [Android 크로스 플랫폼](#5-android-크로스-플랫폼)
6. [학습 포인트](#6-학습-포인트)
7. [Q&A](#7-qa)

---

## 1. Claude Code란?

### 🤖 Claude Code 소개

**Claude Code**는 Anthropic에서 만든 **AI 코딩 어시스턴트**입니다.

```
💡 생각해보세요:
   "코드를 작성할 때 옆에서 도와주는 똑똑한 동료가 있다면?"
```

### 왜 Claude Code를 선택했나요?

#### 기존 방식의 한계
```
😰 혼자 학습할 때의 문제점:
   ❌ 막히면 구글링으로 시간 소비
   ❌ 에러 메시지 해석이 어려움
   ❌ "이게 맞는 방법인가?" 고민
   ❌ 문서만으로는 실전 적용이 어려움
```

#### Claude Code의 장점
```
✨ Claude Code와 함께하면:
   ✅ 실시간으로 코드 작성 및 설명
   ✅ 에러 발생 시 즉시 해결
   ✅ 베스트 프랙티스 제안
   ✅ 단계별 구현 가이드
```

### Claude Code의 핵심 기능

#### 1. 코드 작성 (Write)
```typescript
// Claude가 작성한 코드 예시
const [profile, setProfile] = useState<ProfileData>({
  name: 'Allen Han',
  job: 'iOS Developer',
  bio: 'React Native를 학습 중...',
});
```

#### 2. 파일 읽기 (Read)
```bash
# 프로젝트의 모든 파일을 읽고 이해합니다
Read: package.json
Read: ProfileCard.tsx
Read: .gitignore
```

#### 3. 명령 실행 (Bash)
```bash
# 필요한 명령어를 자동으로 실행
npm install @react-native-async-storage/async-storage
cd ios && pod install
npx react-native run-ios
```

#### 4. 에러 해결
```
❌ 에러 발생:
   "AsyncStorage: NativeModule is null"

🤖 Claude Code가 진단:
   "네이티브 모듈이 링크되지 않았습니다"

✅ 자동 해결:
   npx react-native run-ios (재빌드)
```

### 실제 사용 예시

#### Before (혼자 할 때)
```
1. 구글: "react native asyncstorage 사용법"
2. 문서 읽기 (10분)
3. 코드 복사-붙여넣기
4. 에러 발생 😱
5. 다시 구글링...
⏰ 총 소요 시간: 1시간+
```

#### After (Claude Code와 함께)
```
나: "AsyncStorage로 데이터를 저장하고 싶어"

🤖 Claude:
   1. 패키지 설치
   2. 코드 작성
   3. iOS 네이티브 링크
   4. 사용 예제 제공
   5. 에러 발생 시 자동 해결

⏰ 총 소요 시간: 10분
```

---

## 2. 환경 설정

### 2.1 Claude Code 설치

#### Step 1: VS Code 설치
```bash
# Mac에서 VS Code 다운로드
https://code.visualstudio.com/
```

#### Step 2: Claude Code 확장 설치
```
VS Code Extensions → "Claude Code" 검색 → Install
```

#### Step 3: API Key 설정
```javascript
// settings.json
{
  "claudeCode.apiKey": "sk-ant-api03-..."
}
```

### 2.2 React Native 환경 설정

#### iOS 개발 환경
```bash
# 필요한 도구들
✅ Node.js (v18+)
✅ Watchman
✅ Xcode
✅ CocoaPods

# 설치 명령어
brew install node
brew install watchman
xcode-select --install
sudo gem install cocoapods
```

#### 프로젝트 생성
```bash
# Claude가 자동으로 실행한 명령어들
cd ~/Dev/Repo/RN-Study-Kidsnote/projects
npx @react-native-community/cli@latest init ProfileCardApp
cd ProfileCardApp/ios && pod install
```

### 2.3 Git 설정

```bash
# 프로젝트 초기화
cd ~/Dev/Repo/RN-Study-Kidsnote
git init
git add .
git commit -m "chore: initialize RN-Study-Kidsnote project"
```

---

## 3. Week 01 기본 구현

### 3.1 과제 요구사항

```
📝 Week 01 목표:
   - useState를 활용한 프로필 편집 기능
   - View Mode ↔️ Edit Mode 전환
   - iOS 시뮬레이터에서 실행
```

### 3.2 Claude와 함께 구현하기

#### 대화 시작
```
나: "1주차 과제를 시작하고 싶어. useState로 프로필 편집 기능을 만들려고 해"

🤖 Claude: "프로필 카드 앱을 만들어볼까요?
           단계별로 진행하겠습니다."
```

#### Step 1: 컴포넌트 구조 설계

Claude가 제안한 구조:
```typescript
interface ProfileData {
  name: string;
  job: string;
  bio: string;
}

const ProfileCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({...});
  const [tempProfile, setTempProfile] = useState<ProfileData>(profile);

  // ...
}
```

**💡 Claude의 설명:**
```
"왜 tempProfile이 필요할까요?

❌ 나쁜 방법:
   수정 중에 바로 profile을 변경
   → 취소 버튼을 누르면? 되돌릴 수 없음!

✅ 좋은 방법:
   tempProfile에서 수정
   → 저장할 때만 profile에 반영
   → 취소하면 tempProfile을 버림"
```

#### Step 2: Edit Mode 토글 구현

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

**🤖 Claude의 팁:**
```
"이 패턴은 '낙관적 업데이트의 반대'입니다.
 사용자가 명시적으로 저장할 때까지
 실제 데이터를 변경하지 않습니다."
```

#### Step 3: UI 구현 (조건부 렌더링)

```tsx
{isEditMode ? (
  // Edit Mode: TextInput 표시
  <TextInput
    value={tempProfile.name}
    onChangeText={text => setTempProfile({...tempProfile, name: text})}
  />
) : (
  // View Mode: Text 표시
  <Text>{profile.name}</Text>
)}
```

**💬 나의 질문:**
```
나: "SwiftUI의 if-else 구문과 비슷한가요?"

🤖 Claude: "네, 맞습니다!
           SwiftUI: if condition { View } else { View }
           React:   condition ? <A /> : <B />

           둘 다 선언적 UI의 조건부 렌더링이지만,
           문법만 다를 뿐 개념은 동일합니다."
```

### 3.3 첫 실행의 감동

```bash
# Claude가 실행한 명령어
npx react-native run-ios
```

```
✨ 결과:
   ▸ Build Succeeded
   success Successfully built the app
   success Successfully launched the app

🎉 iPhone 시뮬레이터에 앱이 나타남!
```

**이 순간의 느낌:**
```
😊 "와, 정말 작동하네!"
💭 "SwiftUI로 만들었으면 3시간 걸렸을텐데..."
⏰ Claude와 함께: 30분
```

---

## 4. Week 01 개선하기

### 4.1 개선 아이디어 발굴

**notes/week-01-implementation.md에 남겨둔 TODO:**
```markdown
### 개선 아이디어
- [ ] 프로필 이미지 추가
- [ ] 입력 검증 (빈 값 체크)
- [ ] 저장 성공 Toast 메시지
- [ ] AsyncStorage로 데이터 영속성
```

**🤖 Claude의 제안:**
```
나: "기본 구현은 완료했어. 더 개선하고 싶은데?"

Claude: "좋습니다! 이 4가지를 추가해볼까요?
        1. 프로필 아바타 (시각적 개선)
        2. 입력 검증 (UX 개선)
        3. 저장 알림 (피드백 개선)
        4. AsyncStorage (실용성 개선)"
```

### 4.2 개선 1: 프로필 아바타

#### Claude의 구현 과정

**Step 1: 요구사항 이해**
```
나: "프로필 이미지를 추가하고 싶어"

🤖 Claude: "실제 이미지 파일은 아직 없으시죠?
           이름의 첫 글자를 보여주는
           원형 아바타를 만들어볼까요?"
```

**Step 2: 코드 작성**
```tsx
<View style={styles.avatarContainer}>
  <View style={styles.avatar}>
    <Text style={styles.avatarText}>
      {profile.name.charAt(0).toUpperCase()}
    </Text>
  </View>
</View>
```

**Step 3: 스타일링**
```typescript
avatar: {
  width: 100,
  height: 100,
  borderRadius: 50,  // 원형으로 만들기
  backgroundColor: '#007AFF',  // iOS 블루
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOpacity: 0.15,
  shadowRadius: 4,
}
```

**💡 학습 포인트:**
```
나: "borderRadius를 width/height의 절반으로 하면
    원이 되는구나!"

Claude: "정확합니다! 이건 CSS의 기본 원리입니다.
        SwiftUI의 .clipShape(Circle())와 같은 효과죠."
```

### 4.3 개선 2: 입력 검증

#### 검증 규칙 설계

```typescript
// Claude가 제안한 검증 규칙
const validateProfile = (data: ProfileData): ValidationErrors => {
  const newErrors: ValidationErrors = {};

  // 이름: 2-20자
  if (!data.name.trim()) {
    newErrors.name = '이름을 입력해주세요';
  } else if (data.name.trim().length < 2) {
    newErrors.name = '이름은 2자 이상이어야 합니다';
  }

  // 직업: 2-30자
  // 소개: 10-200자

  return newErrors;
};
```

**💬 Claude와의 대화:**
```
나: "왜 trim()을 사용하나요?"

🤖 Claude: "공백만 입력하는 걸 방지하기 위해서입니다.

           예시:
           '   ' → trim() → '' → 빈 문자열로 감지
           '  Allen  ' → trim() → 'Allen' → 유효한 입력"
```

#### 에러 피드백 UI

```tsx
<TextInput
  style={[styles.input, errors.name && styles.inputError]}
  value={tempProfile.name}
  onChangeText={text => setTempProfile({...tempProfile, name: text})}
/>
{errors.name && (
  <Text style={styles.errorText}>{errors.name}</Text>
)}
```

**시각적 효과:**
```
✅ 정상: 회색 테두리
❌ 에러: 빨간 테두리 + 에러 메시지
```

### 4.4 개선 3: AsyncStorage 데이터 영속성

#### 가장 도전적인 부분

**나의 고민:**
```
나: "앱을 껐다 켜면 데이터가 사라져요.
    어떻게 저장하나요?"

🤖 Claude: "AsyncStorage를 사용하면 됩니다.
           iOS의 UserDefaults와 비슷합니다."
```

#### 구현 과정

**Step 1: 패키지 설치**
```bash
# Claude가 자동 실행
npm install @react-native-async-storage/async-storage
cd ios && pod install
```

**Step 2: 데이터 저장**
```typescript
const saveProfile = async (profileData: ProfileData) => {
  try {
    const jsonValue = JSON.stringify(profileData);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('저장 실패:', e);
  }
};
```

**Step 3: 데이터 불러오기**
```typescript
useEffect(() => {
  loadProfile();
}, []);

const loadProfile = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue != null) {
      const loadedProfile = JSON.parse(jsonValue);
      setProfile(loadedProfile);
    }
  } catch (e) {
    console.error('불러오기 실패:', e);
  }
};
```

#### 😱 에러 발생!

**앱을 리로드했더니...**
```
❌ Error: [@RNC/AsyncStorage]: NativeModule: AsyncStorage is null.
```

**패닉 순간:**
```
나: "에러가 나요! 뭐가 문제죠?? 😱"

🤖 Claude: "걱정하지 마세요.
           네이티브 모듈을 추가했을 때 흔한 문제입니다.

           JavaScript만 리로드하면 안 되고,
           네이티브 코드도 다시 컴파일해야 합니다."
```

**해결:**
```bash
# Claude가 실행한 명령어
npx react-native run-ios

# 결과
▸ Compiling RNCAsyncStorage.mm
▸ Building library libRNCAsyncStorage.a
▸ Build Succeeded
✅ 앱 정상 작동!
```

**💡 학습:**
```
"React Native = JavaScript + Native Code

JavaScript 변경: Hot Reload 가능 ⚡
Native 변경: 전체 Rebuild 필요 🔨

AsyncStorage는 Native 모듈이므로
처음 추가할 때는 Rebuild가 필수!"
```

---

## 5. Android 크로스 플랫폼

### 5.1 왜 Android도 해보기로 했나요?

**나의 생각:**
```
💭 "iOS만 되면 되는데...
   근데 React Native의 진짜 장점은
   크로스 플랫폼 아닌가?"

👨‍💻 "한번 해보자!"
```

### 5.2 Android 환경 설정 여정

#### Challenge 1: Android Studio 권한 에러

**에러:**
```
❌ Start Failed
   java.nio.file.AccessDeniedException:
   /Users/allen/Library/Application Support/Google/AndroidStudio2024.2
```

**😱 당황:**
```
나: "Android Studio가 안 켜져요!"

🤖 Claude: "권한 문제네요.
           Google 디렉토리의 소유자가 root입니다.
           터미널에서 이 명령어를 실행해주세요:

           sudo chown -R allen:staff ~/Library/Application Support/Google"
```

**✅ 해결:**
```bash
sudo chown -R allen:staff ~/Library/Application\ Support/Google
# 비밀번호 입력
# Android Studio 정상 시작!
```

#### Challenge 2: SDK 다운로드

**Claude의 가이드:**
```
🤖 "Android Studio가 열렸으면:
   1. More Actions → SDK Manager
   2. Android 14.0 (API 34) 선택
   3. SDK Tools에서 필요한 도구 선택
   4. Apply 클릭"

⏰ 다운로드 시간: 약 10분
📦 용량: 약 2GB
```

#### Challenge 3: 환경 변수 설정

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
echo $ANDROID_HOME
# /Users/allen/Library/Android/sdk ✅
```

#### Challenge 4: 에뮬레이터 생성

**Android Studio에서:**
```
1. Virtual Device Manager
2. Create Device
3. Pixel 7 선택
4. API 36 (arm64-v8a) 선택  ← Apple Silicon 최적화!
5. Finish
```

#### Challenge 5: SDK location not found

**빌드 에러:**
```
❌ SDK location not found. Define a valid SDK location with
   an ANDROID_HOME environment variable or by setting
   the sdk.dir path in your project's local properties file
```

**Claude의 해결:**
```
🤖 "local.properties 파일을 만들어야 합니다."

# android/local.properties 생성
sdk.dir=/Users/allen/Library/Android/sdk

✅ 문제 해결!
```

### 5.3 드디어 실행!

```bash
# 에뮬레이터 시작
~/Library/Android/sdk/emulator/emulator -avd Pixel_7_API_36 &

# 연결 확인
adb devices
# emulator-5554    device ✅

# 앱 실행
npx react-native run-android
```

**빌드 로그:**
```
Downloading Gradle...
Installing NDK...
Building...

> Task :app:installDebug
Installing APK 'app-debug.apk' on 'Pixel_7_API_36(AVD) - 16'
Installed on 1 device.

BUILD SUCCESSFUL in 3m 10s
Starting the app on "emulator-5554"...
```

**🎉 성공의 순간:**
```
📱 Pixel 7 에뮬레이터 화면:
   - 프로필 카드 ✅
   - 아바타 (A) ✅
   - 이름, 직업, 소개 ✅
   - 수정 버튼 ✅

😊 "iOS와 똑같이 작동한다!"
```

### 5.4 크로스 플랫폼의 마법

**단일 코드베이스:**
```typescript
// src/components/ProfileCard.tsx
// 이 파일 하나로 iOS와 Android 모두 지원!

export default ProfileCard;  // ← 마법! ✨
```

**실행 비교:**
```
iOS:     npx react-native run-ios
Android: npx react-native run-android

코드: 100% 동일
UI:   100% 동일
기능: 100% 동일
```

**💰 비용 절감:**
```
전통적인 방법:
  iOS 개발자 + Android 개발자 = 2명
  개발 시간 × 2
  유지보수 × 2

React Native:
  개발자 1명
  개발 시간 1회
  유지보수 1회
```

---

## 6. 학습 포인트

### 6.1 기술적 학습

#### React Native 핵심 개념

**1. useState Hook**
```typescript
// Before (클래스 컴포넌트)
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  updateName(name) {
    this.setState({ name });
  }
}

// After (함수 컴포넌트 + Hooks)
const Profile = () => {
  const [name, setName] = useState('');
  // 훨씬 간결! ✨
};
```

**2. Controlled Components**
```typescript
// React Native의 핵심 패턴
<TextInput
  value={tempProfile.name}  // ← State에서 값을 가져옴
  onChangeText={text =>      // ← 변경 시 State 업데이트
    setTempProfile({...tempProfile, name: text})
  }
/>

// 단방향 데이터 흐름:
// State → UI → Event → State 업데이트 → UI 재렌더링
```

**3. useEffect Hook**
```typescript
// 컴포넌트가 마운트될 때 한 번만 실행
useEffect(() => {
  loadProfile();  // AsyncStorage에서 데이터 불러오기
}, []);  // ← 빈 배열: 마운트 시에만 실행

// SwiftUI의 .onAppear { }와 비슷!
```

#### 크로스 플랫폼 아키텍처

```
┌─────────────────────────────────────┐
│     React Native (JavaScript)       │
│  - 비즈니스 로직                     │
│  - UI 컴포넌트                       │
│  - 상태 관리                         │
└──────────────┬──────────────────────┘
               │
        ┌──────┴───────┐
        │              │
┌───────▼─────┐  ┌────▼──────┐
│  iOS Native │  │  Android  │
│  - UIKit    │  │  Native   │
│  - Swift    │  │  - Java   │
│  - Obj-C    │  │  - Kotlin │
└─────────────┘  └───────────┘
```

**Bridge 패턴:**
```
JavaScript ←→ Bridge ←→ Native Code

예: AsyncStorage
1. JS: AsyncStorage.setItem('key', 'value')
2. Bridge: 메시지 전달
3. Native: iOS UserDefaults 또는
           Android SharedPreferences에 저장
```

### 6.2 Claude Code 활용 패턴

#### Pattern 1: 단계별 구현

**효과적인 대화 방법:**
```
❌ 나쁜 예:
   "앱을 만들어줘"

✅ 좋은 예:
   "1. 프로필 카드 컴포넌트를 만들고 싶어
    2. useState로 편집 모드를 구현하고 싶어
    3. AsyncStorage로 저장하고 싶어"
```

**Claude의 대응:**
```
🤖 단계별 진행:
   1. 기본 구조 생성
   2. 동작 확인
   3. 기능 추가
   4. 테스트
   5. 문서화
```

#### Pattern 2: 에러 해결

**에러 발생 시:**
```
1. 당황하지 않기 😌
2. 에러 메시지 전체 복사
3. Claude에게 공유
4. 해결책 제안 받기
5. 배우기!
```

**예시:**
```
나: [에러 스크린샷 공유]

🤖 Claude:
   "AsyncStorage 네이티브 모듈이 링크되지 않았습니다.

    이유:
    - Native 모듈을 처음 추가했을 때
    - JavaScript Hot Reload만으로는 부족

    해결:
    npx react-native run-ios

    이제 이해하셨나요? 😊"
```

#### Pattern 3: 문서화

**Claude의 자동 문서화:**
```
✅ 실시간으로 주석 추가
✅ README 업데이트
✅ 학습 노트 작성
✅ 커밋 메시지 작성

결과: 프로젝트를 나중에 봐도 이해 가능!
```

### 6.3 iOS 개발자의 시각

#### SwiftUI vs React Native

**공통점:**
```
1. 선언적 UI
   SwiftUI: struct ContentView: View { ... }
   React:   const Component = () => { ... }

2. 상태 관리
   SwiftUI: @State private var name = ""
   React:   const [name, setName] = useState("")

3. 조건부 렌더링
   SwiftUI: if isEditing { EditView() }
   React:   {isEditing && <EditView />}
```

**차이점:**
```
SwiftUI:
  ✅ Type-safe (컴파일 타임 체크)
  ✅ Xcode Preview (빠른 피드백)
  ❌ iOS only

React Native:
  ✅ 크로스 플랫폼
  ✅ Hot Reload (빠른 개발)
  ❌ Type safety는 TypeScript 필요
```

**어느 것을 선택할까?**
```
iOS only 앱: SwiftUI 추천
크로스 플랫폼: React Native 추천
둘 다 배우면: 더 좋음! 🎯
```

### 6.4 개인적 성장

#### 시간 비교

**전통적인 학습 방법:**
```
Week 01 기본 구현: 3-4시간
  - 문서 읽기: 1시간
  - 구글링: 1시간
  - 시행착오: 1-2시간

개선사항 추가: 4-5시간
  - AsyncStorage 학습: 2시간
  - 에러 해결: 2-3시간

Android 환경 설정: 3-4시간
  - 문서 읽기: 1시간
  - 설치 및 설정: 2-3시간

총 시간: 10-13시간
```

**Claude Code와 함께:**
```
Week 01 기본 구현: 30분
개선사항 추가: 1시간
Android 환경 설정: 1.5시간

총 시간: 3시간

🚀 시간 절약: 70-75%
```

#### 학습 품질

**전통적인 방법:**
```
😕 단점:
   - 왜 이렇게 하는지 모르고 복붙
   - 에러 원인을 이해하지 못함
   - "일단 되게" 만드는 데 집중
```

**Claude Code와 함께:**
```
😊 장점:
   - 각 단계마다 설명 들음
   - 에러의 근본 원인 이해
   - 베스트 프랙티스 학습
   - 왜 이렇게 하는지 이해
```

---

## 7. Q&A

### 자주 묻는 질문들

#### Q1: Claude Code 없이도 할 수 있나요?

**A:**
```
네, 가능합니다!

하지만:
  ❌ 시간이 3-4배 더 걸립니다
  ❌ 에러 해결에 막힐 수 있습니다
  ❌ 베스트 프랙티스를 놓칠 수 있습니다

Claude Code는 선택이 아니라
학습 가속기입니다! 🚀
```

#### Q2: Claude가 모든 것을 해주나요?

**A:**
```
아니요!

Claude의 역할: 🤖
  ✅ 코드 작성 도움
  ✅ 에러 해결
  ✅ 설명 제공

내 역할: 👨‍💻
  ✅ 요구사항 정의
  ✅ 구조 설계 의사결정
  ✅ 코드 리뷰 및 이해
  ✅ 학습 및 응용

함께 협업하는 것이 핵심!
```

#### Q3: 실제 프로젝트에도 사용 가능한가요?

**A:**
```
네! 이번 실습은 production-ready입니다.

✅ TypeScript로 타입 안정성
✅ 입력 검증으로 데이터 무결성
✅ AsyncStorage로 데이터 영속성
✅ 크로스 플랫폼 지원

추가하면 좋은 것:
  - 테스트 코드
  - CI/CD
  - 에러 모니터링
```

#### Q4: iOS 개발자가 React Native를 배워야 하나요?

**A:**
```
선택의 문제입니다:

iOS only 커리어:
  → SwiftUI 심화 학습 추천

크로스 플랫폼 관심:
  → React Native 학습 추천

둘 다 배우면:
  → 시장 가치 상승! 📈
  → 프로젝트 선택권 증가
```

#### Q5: 다음 단계는?

**A:**
```
Week 02 계획:
  📚 JSX 스타일링 심화
  🎨 Flexbox 레이아웃
  🔧 커스텀 컴포넌트

실전 적용:
  🏢 회사 프로젝트에 적용 검토
  📱 사이드 프로젝트 시작
  👥 팀원들과 공유
```

---

## 📊 통계 및 성과

### 프로젝트 통계

```
📁 파일 수: 50+
📝 코드 라인: 1,500+
⏰ 총 개발 시간: 3시간
🐛 해결한 에러: 5개
📚 학습 노트: 3개
💾 Git 커밋: 5개
🤖 Claude 대화: 100+ 메시지
```

### 기술 스택

```
Frontend:
  - React Native 0.76
  - TypeScript 5.0
  - React 18.3

Native:
  - iOS (Xcode 15)
  - Android (API 36)

Storage:
  - AsyncStorage 2.0

Tools:
  - Claude Code
  - Git
  - VS Code
```

---

## 🎯 핵심 교훈

### 1. AI는 학습 가속기

```
Claude Code ≠ 코드 제너레이터
Claude Code = 개인 튜터 + 페어 프로그래머

학습 속도: 3-4배 향상
이해도: 오히려 더 깊어짐
```

### 2. 크로스 플랫폼의 힘

```
하나의 코드베이스:
  iOS ✅
  Android ✅

비용 절감: 50%
개발 속도: 2배
```

### 3. 단계적 접근

```
1. 기본부터 시작
2. 동작 확인
3. 개선 추가
4. 테스트
5. 문서화

한 번에 모든 것을 하려 하지 말기!
```

### 4. 에러는 학습 기회

```
에러 발생 = 성장 기회

이번 프로젝트에서 배운 것:
  ✅ Native Module Linking
  ✅ Android 환경 설정
  ✅ 권한 관리
  ✅ 빌드 시스템 이해
```

---

## 🙏 감사의 말

```
이 여정을 함께한 모든 분들께:

Claude Code:
  항상 인내심 있게 설명해준 AI 동료

React Native 커뮤니티:
  훌륭한 문서와 도구를 만들어준 개발자들

그리고 여러분:
  이 발표를 들어주셔서 감사합니다!
```

---

## 📚 추가 자료

### 문서

- `/notes/week-01-implementation.md` - 상세 구현 노트
- `/notes/android-setup.md` - Android 환경 설정 가이드
- `README.md` - 프로젝트 개요

### Git 커밋 히스토리

```bash
git log --oneline

8fb91a8 docs: add Android development environment setup guide
eb001c6 docs: update Week 01 implementation notes with improvements
c1ce38b feat: enhance ProfileCard with validation, persistence, and avatar
832951f chore: add ProfileCardApp React Native project files
f831e9c feat: implement Week 01 profile card app with useState
```

### 참고 링크

- [React Native 공식 문서](https://reactnative.dev/)
- [Claude Code 문서](https://docs.claude.com/en/docs/claude-code)
- [AsyncStorage GitHub](https://github.com/react-native-async-storage/async-storage)

---

## 질문 & 토론

```
💬 자유롭게 질문해주세요!

관심 주제:
  - Claude Code 활용 팁
  - React Native vs Native 개발
  - AsyncStorage 심화
  - Android 환경 설정
  - 크로스 플랫폼 전략
```

---

**발표 종료**

감사합니다! 🙇‍♂️

**연락처:**
- GitHub: [프로젝트 저장소]
- Email: [이메일]
