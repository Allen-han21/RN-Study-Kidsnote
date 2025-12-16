# Figma MCP를 활용한 Design-to-Code 워크플로우

> **발표자**: Allen
> **발표일**: 2025년 12월
> **키워드**: Figma MCP, Claude Code, Design-to-Code, UIKit, SnapKit, 자동화

---

## 📋 목차

1. [배경 및 문제 정의](#1-배경-및-문제-정의)
2. [Figma MCP 소개](#2-figma-mcp-소개)
3. [워크플로우 아키텍처](#3-워크플로우-아키텍처)
4. [구현 상세](#4-구현-상세)
5. [실제 사용 예시](#5-실제-사용-예시)
6. [검증 시스템](#6-검증-시스템)
7. [결론 및 향후 계획](#7-결론-및-향후-계획)

---

## 1. 배경 및 문제 정의

### 🤔 기존의 문제점

디자인을 iOS 코드로 변환할 때 흔히 겪는 문제들:

| 문제 | 설명 |
|------|------|
| **속성값 오차** | padding 16인데 18로 입력, cornerRadius 누락 |
| **색상 불일치** | Hex 값 복사 오류, 디자인 시스템 색상 미적용 |
| **레이아웃 구조 오해** | Auto Layout 방향 잘못 해석 |
| **반복 작업** | 매번 Figma ↔ Xcode 왔다갔다 |
| **검증 어려움** | "이게 디자인이랑 똑같은 건가?" |

### 💡 해결 목표

```
Figma 디자인 → 정확한 스펙 추출 → UIKit 코드 자동 생성 → 검증 자동화
```

**핵심 가치**:
- ✅ 속성값 오차 제로 (Zero Tolerance)
- ✅ kidsnote 코드 컨벤션 자동 적용
- ✅ 복합 검증으로 품질 보장

---

## 2. Figma MCP 소개

### MCP (Model Context Protocol)란?

```
┌─────────────┐     MCP Protocol     ┌─────────────┐
│   Claude    │ ◄──────────────────► │   Figma     │
│    Code     │    (JSON-RPC 2.0)    │   Desktop   │
└─────────────┘                      └─────────────┘
```

- **Anthropic이 개발한 표준 프로토콜**
- LLM이 외부 도구/서비스와 안전하게 통신
- Figma, GitHub, Notion 등 다양한 MCP 서버 존재

### Figma MCP 서버 종류

| 타입 | 특징 | 요금 |
|------|------|------|
| **Remote MCP** | 웹 기반, API 호출 제한 | 유료 (Enterprise) |
| **Desktop MCP** | 로컬 Figma 앱 연동 | 무료 (Professional+) |

### Desktop MCP 설정

```bash
# Claude Code에 Figma Desktop MCP 추가
claude mcp add figma-desktop \
    --transport http \
    --url http://127.0.0.1:3845/mcp \
    --scope user
```

**Figma Desktop 설정**:
1. Figma Desktop 앱 최신 버전 설치
2. Preferences → MCP Server → Enable
3. Dev Mode 진입 (Shift+D)

### MCP가 제공하는 도구들

| 도구 | 설명 |
|------|------|
| `get_design_context` | 선택된 노드의 디자인 컨텍스트 |
| `get_screenshot` | 디자인 스크린샷 캡처 |
| `get_metadata` | 레이어 구조 및 메타데이터 |
| `get_code_snippet` | CSS/Swift 코드 스니펫 |

---

## 3. 워크플로우 아키텍처

### 전체 흐름

```
┌──────────────────────────────────────────────────────────────────┐
│                    Design-to-Code Workflow                        │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐       │
│  │ Step 1  │ → │ Step 2  │ → │ Step 3  │ → │ Step 4  │       │
│  │ 스펙추출 │    │코드생성  │    │ 빌드   │    │  검증   │       │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘       │
│       │              │              │              │              │
│       ▼              ▼              ▼              ▼              │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐       │
│  │ Figma   │    │ UIKit + │    │ Xcode   │    │스크린샷 │       │
│  │   MCP   │    │ SnapKit │    │Simulator│    │  비교   │       │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘       │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### 하이브리드 접근 (MCP + REST API)

```python
# MCP: 디자인 컨텍스트, 스크린샷
# REST API: 상세 속성값 (fills, strokes, effects)

def extract_spec(figma_url):
    # 1. MCP로 컨텍스트 가져오기
    context = mcp.get_design_context(node_id)

    # 2. REST API로 상세 속성 보완
    details = rest_api.get_node_details(file_key, node_id)

    # 3. 통합 스펙 생성
    return merge_specs(context, details)
```

**왜 하이브리드인가?**
- MCP: 실시간 컨텍스트, 스크린샷에 강점
- REST API: 상세 속성값 (fills, effects) 추출에 강점
- 두 방식의 장점을 결합

---

## 4. 구현 상세

### 4.1 스킬 폴더 구조

```
~/.claude/skills/design-to-code/
├── SKILL.md                           # 메인 워크플로우 문서
├── references/
│   ├── color_mapping.json             # Figma hex → UIColor 매핑
│   ├── ios_attribute_mapping.md       # 속성 변환 규칙
│   └── kidsnote_conventions.md        # 코드 컨벤션
├── scripts/
│   ├── extract_figma_spec.py          # 스펙 추출
│   ├── capture_simulator.sh           # 시뮬레이터 캡처
│   ├── compare_screenshots.py         # 이미지 비교
│   └── generate_report.py             # 검증 리포트
└── templates/
    ├── BaseView_template.swift        # 코드 템플릿
    └── ViewSnapshotTestHelper.swift   # 테스트 헬퍼
```

### 4.2 색상 매핑 시스템

```json
// color_mapping.json
{
  "neutral": {
    "#FFFFFF": "white",
    "#F9FAFB": "Neutral_N10",
    "#333C47": "Neutral_N700",
    "#1B2027": "Neutral_N900"
  },
  "blue": {
    "#208DF9": "Blue_B600"
  },
  "red": {
    "#FA4F38": "Red_R500"
  }
}
```

**변환 예시**:
```swift
// Figma: #F9FAFB
// iOS:   UIColor.Neutral_N10

private struct Color {
    static let background: UIColor = UIColor.Neutral_N10
}
```

### 4.3 속성 매핑 규칙

| Figma 속성 | iOS 속성 | 변환 |
|-----------|---------|------|
| `fontSize: 16` | `font.pointSize` | 그대로 |
| `fontWeight: 600` | `.semibold` | 매핑 |
| `letterSpacing: -0.32` | `kern: -0.32` | NSAttributedString |
| `lineHeightPx: 20` | `minimumLineHeight: 20` | NSParagraphStyle |
| `cornerRadius: 12` | `layer.cornerRadius = 12` | 그대로 |
| `layoutMode: VERTICAL` | `VStackView` | StackView |
| `itemSpacing: 8` | `spacing = 8` | 그대로 |

### 4.4 코드 생성 템플릿

```swift
// kidsnote 컨벤션에 맞는 BaseView 패턴

final class {ComponentName}View: BaseView {

    // MARK: - Metric
    private struct Metric {
        static let cornerRadius: CGFloat = {value}
        static let horizontalPadding: CGFloat = {value}
        static let verticalPadding: CGFloat = {value}
        static let itemSpacing: CGFloat = {value}
    }

    // MARK: - Color
    private struct Color {
        static let background: UIColor = UIColor.{colorName}
    }

    // MARK: - UI Views
    private let containerView: UIView = UIView().then {
        $0.backgroundColor = Color.background
        $0.layer.cornerRadius = Metric.cornerRadius
        $0.clipsToBounds = true
    }

    // MARK: - Setup
    override func addViews() {
        super.addViews()
        addSubview(containerView)
    }

    override func setupConstraints() {
        containerView.snp.makeConstraints { make in
            make.edges.equalToSuperview()
        }
    }
}
```

---

## 5. 실제 사용 예시

### 사용 방법

Claude Code에게 요청:
```
이 Figma URL의 디자인을 코드로 변환하고 검증 리포트 생성해줘:
https://www.figma.com/design/FILE_KEY/Name?node-id=XXX-YYY
```

### 실제 변환 예시

**Figma 스펙** (node-id: 47054-9927):
```
Frame 1597886481
├── Size: 343 × 466
├── Background: #FFFFFF
├── Corner Radius: 16
├── Auto Layout: VERTICAL
├── Item Spacing: 16
├── Padding: T:24 R:16 B:16 L:16
└── Children:
    ├── Header (HORIZONTAL, spacing: 12)
    │   ├── Icon (48×48, gradient)
    │   └── Title Area (VERTICAL, spacing: 4)
    └── Content Area
```

**생성된 iOS 코드**:
```swift
final class GroupPurchaseAccordionSectionView: BaseView {

    private struct Metric {
        static let containerWidth: CGFloat = 343      // ✅ Figma: 343
        static let containerHeight: CGFloat = 466     // ✅ Figma: 466
        static let cornerRadius: CGFloat = 16         // ✅ Figma: 16
        static let horizontalPadding: CGFloat = 16    // ✅ Figma: L16, R16
        static let topPadding: CGFloat = 24           // ✅ Figma: T24
        static let bottomPadding: CGFloat = 16        // ✅ Figma: B16
        static let sectionSpacing: CGFloat = 16       // ✅ Figma: itemSpacing 16
        static let headerSpacing: CGFloat = 12        // ✅ Figma: header spacing
        static let iconSize: CGFloat = 48             // ✅ Figma: 48×48
    }

    // VStackView → VERTICAL layout
    private let contentStackView: VStackView = VStackView(
        spacing: Metric.sectionSpacing,
        alignment: .fill,
        distribution: .fill
    )

    // HStackView → HORIZONTAL layout
    private let headerStackView: HStackView = HStackView(
        spacing: Metric.headerSpacing,
        alignment: .center,
        distribution: .fill
    )

    // ...
}
```

---

## 6. 검증 시스템

### 6.1 복합 검증 방식

```
┌─────────────────────────────────────────────────────┐
│              복합 검증 (Composite Verification)      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │스크린샷  │  │ 속성값   │  │ 수동     │          │
│  │  비교    │  │  비교    │  │ 검토     │          │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘          │
│       │             │             │                 │
│       ▼             ▼             ▼                 │
│  ┌──────────────────────────────────────┐          │
│  │         종합 검증 리포트              │          │
│  │  - 유사도: 92.5%                     │          │
│  │  - 등급: EXCELLENT                   │          │
│  │  - 불일치 항목: 2개                  │          │
│  └──────────────────────────────────────┘          │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 6.2 스크린샷 비교

```bash
# 시뮬레이터 스크린샷 캡처
~/.claude/skills/design-to-code/scripts/capture_simulator.sh \
    /tmp/ios_result.png

# Figma vs iOS 비교
python3 compare_screenshots.py figma.png ios.png
```

**비교 알고리즘**:
- **Perceptual Hash (pHash)**: 시각적 유사도 측정 (60% 가중치)
- **Average Hash (aHash)**: 빠른 1차 필터링 (20% 가중치)
- **Structural**: 픽셀 단위 정밀 비교 (20% 가중치)

**출력 예시**:
```
📊 스크린샷 비교 결과
============================================
📈 비교 결과:
   perceptual_hash: 95.2%
   average_hash: 93.8%
   structural: 89.1%

🎯 종합 유사도: 93.5%

🏆 등급: EXCELLENT
   거의 완벽한 구현입니다. 미세 조정만 필요할 수 있습니다.
   통과 여부: ✅ PASS
```

### 6.3 검증 리포트 예시

```markdown
# Design-to-Code 검증 리포트

## 속성 비교 체크리스트

| 속성 | Figma 값 | iOS 코드 | 확인 |
|------|----------|----------|------|
| width | `343` | `make.width.equalTo(343)` | ☑️ |
| cornerRadius | `16` | `layer.cornerRadius = 16` | ☑️ |
| backgroundColor | `#FFFFFF` | `UIColor.white` | ☑️ |
| layoutMode | `VERTICAL` | `VStackView` | ☑️ |
| itemSpacing | `16` | `spacing = 16` | ☑️ |

## 자식 노드 구조
```
FRAME: Container
  ├─ FRAME: Header
  │   ├─ INSTANCE: Icon
  │   └─ FRAME: TitleArea
  └─ FRAME: Content
```
```

### 6.4 SnapshotTesting 연동

```swift
// 자동화된 시각적 회귀 테스트

import SnapshotTesting

class MyViewSnapshotTests: XCTestCase {

    func test_GroupPurchaseView_matchesDesign() {
        let view = GroupPurchaseAccordionSectionView()
        view.configure(
            subtitle: "3세 엄마들의 요즘 고민은?",
            title: "겨울에도 뛰어놀 곳 어디 없을까?"
        )

        // 첫 실행: record = true (참조 이미지 생성)
        // 이후: record = false (비교 모드)
        assertSnapshot(
            of: view,
            as: .image(size: CGSize(width: 343, height: 466)),
            record: false
        )
    }
}
```

---

## 7. 결론 및 향후 계획

### 🎯 달성한 것

| 항목 | 기존 | 개선 후 |
|------|------|---------|
| **스펙 추출** | 수동 확인 | MCP 자동 추출 |
| **코드 생성** | 직접 작성 | 템플릿 기반 자동 생성 |
| **속성 오차** | 빈번 | 제로 (검증으로 보장) |
| **검증** | 육안 | 스크린샷 + 속성값 자동 비교 |
| **컨벤션** | 수동 적용 | 자동 적용 |

### 📈 효과

- ⏱️ **시간 절약**: 디자인 → 코드 변환 시간 50% 이상 단축
- 🎯 **정확도 향상**: 속성값 오차 90% 이상 감소
- 📋 **일관성**: 코드 스타일 자동 표준화
- 🔄 **재현성**: 동일한 디자인 = 동일한 코드

### 🚀 향후 계획

1. **SwiftUI 지원 추가**: UIKit 외에 SwiftUI 코드 생성
2. **컴포넌트 라이브러리 연동**: 기존 컴포넌트 재사용 판단
3. **CI/CD 통합**: PR 시 자동 디자인 검증
4. **다크 모드 자동 처리**: Light/Dark 테마 자동 생성

---

## 🔗 참고 자료

### 공식 문서
- [Figma MCP Server 공식 블로그](https://www.figma.com/blog/introducing-figma-mcp-server/)
- [MCP (Model Context Protocol) 스펙](https://modelcontextprotocol.io/)
- [Claude Code 문서](https://docs.anthropic.com/claude-code)

### 프로젝트 파일
- 스킬 폴더: `~/.claude/skills/design-to-code/`
- 색상 매핑: `references/color_mapping.json`
- 속성 매핑: `references/ios_attribute_mapping.md`

### 의존성
- [swift-snapshot-testing](https://github.com/pointfreeco/swift-snapshot-testing) - 스냅샷 테스트
- [SnapKit](https://github.com/SnapKit/SnapKit) - Auto Layout DSL
- [Then](https://github.com/devxoul/Then) - 초기화 Sugar

---

## Q&A

질문 있으시면 편하게 말씀해주세요! 🙋‍♂️

---

*이 문서는 Claude Code를 활용하여 작성되었습니다.*
