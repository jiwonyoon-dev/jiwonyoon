import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '윤지원 이력서',
  description: '프론트엔드 개발자 윤지원의 이력서 입니다.'
}

const SkillLevel = ({ level }: { level: number }) => {
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < level ? 'text-yellow-500' : 'text-gray-300'}>
        ★
      </span>
    )
  }
  return <div>{stars}</div>
}

const SkillItem = ({ skill, level, description }: { skill: string; level: number; description: string }) => {
  return (
    <div className="project">
      <div className="flex items-center">
        <h5 className="mr-4">{skill}</h5>
        <SkillLevel level={level} />
      </div>
      <p className="leading-relaxed">{description}</p>
    </div>
  )
}

export default function ResumePage() {
  return (
    <div className="container">
      <section>
        <h2>
          문제를 찾아 기술로 해결하는, <br />
          주도적인 개발자 윤지원 입니다.
        </h2>
        <p>
          주도적인 문제 해결 능력과 Full-stack 개발 경험(Node.js, React)을 갖춘 프론트엔드 개발자입니다. 자율주행 로봇
          회사에서 현장 운영 비효율 개선을 위해 '딸깍이' 툴을 직접 개발하여 사내 공식 플랫폼으로 채택되는 성과를
          만들었으며, 애자일 환경에서의 실무 프로젝트 참여를 통해 협업과 개발 역량을 키웠습니다. 사용자 경험 개선에
          기여하며 함께 성장하는 개발자가 되겠습니다.
        </p>
        <p>저의 협업 능력과 성과에 대한 동료들의 긍정적인 평가는 LinkedIn 프로필에서 확인하실 수 있습니다.</p>
      </section>
      <section>
        <div className="section-divider">
          <h3>프론트엔드 핵심 (Core Front-end)</h3>
          <SkillItem
            skill="Problem Solving"
            level={4}
            description="현장 업무의 비효율성을 스스로 발견하고 '딸깍이'라는 기술적 솔루션을 기획부터 구현, 개선까지 주도하여 팀 전체의 생산성을 향상시키고 사내 공식 플랫폼으로 채택되는 성과를 이끌어냈습니다. (6,000+ 이슈 관리, 업무 시간 단축 기여)"
          />
          <SkillItem
            skill="JavaScript"
            level={3}
            description="'딸깍이' 프로젝트의 클라이언트(Chrome Ext) 및 서버(Node.js) 핵심 로직 개발 전반에 활용하여 비동기 처리, DOM 조작 등을 독립적으로 수행했습니다."
          />
          <SkillItem
            skill="TypeScript"
            level={3}
            description="회사 실무 프로젝트(Next.js 기반)에서 제네릭(Generics)과 유틸리티 타입(Utility Types)을 활용하여 컴포넌트 및 함수의 재사용성을 높이고 타입 안정성을 강화한 경험이 있습니다."
          />
          <SkillItem
            skill="React"
            level={3}
            description="'딸깍이' UI 개발 및 상태 관리 경험(Hooks 활용), 특히 컴포넌트 라이프사이클 이해를 바탕으로 부수 효과(side effect)를 효과적으로 관리한 경험이 있습니다. 실무 프로젝트 진행 시 Next.js 프로젝트 내 컴포넌트 기반 기능 구현(회원관리 등)에 활용했으며, Custom Hook 작성 경험도 있습니다."
          />
          <SkillItem
            skill="Next.js"
            level={2}
            description="회사 프로젝트 참여 기간 중 Next.js 기반의 회사 프로젝트에 참여하여 페이지 기반 라우팅 환경에서 회원 관리 등 실제 서비스 기능 개발 경험이 있습니다."
          />
        </div>
      </section>
      <section>
        <h2>경력 사항</h2>
        <div className="row">
          <div className="row-left">
            <h3>뉴빌리티</h3>
            <span>
              <time dateTime="2023-06">2023. 06.</time> - 현재
            </span>
          </div>
          <div className="row-right">
            <div className="project">
              <h4>Platform Core Frontend</h4>
              <span className="time">
                <time dateTime="2025-03">2025. 03.</time> - 현재
              </span>

              <h5>주요 업무</h5>
              <ul>
                <li>Neubie-Go 플랫폼 프론트엔드 기능 고도화 및 안정화 기여</li>
                <li>사용자 피드백 및 기획 변경에 따른 신규 기능 개발 및 기존 기능 유지보수</li>
                <li>코드 리뷰, 리팩토링 등을 통한 코드 품질 개선 및 성능 최적화 작업 참여</li>
                <li>차세대 개발 환경 구축을 위한 Nx 모노레포 환경 구성 학습 및 팀 내 기술 공유/스터디 참여</li>
              </ul>
            </div>

            <div className="project">
              <h4>Platform Core Frontend</h4>
              <span className="time">
                <time dateTime="2024-08">2024. 08.</time> - <time dateTime="2024-10">2024. 10.</time> (3개월)
              </span>
              <h5>주요 업무</h5>
              <ul>
                <li>Next.js, TypeScript 기반 Neubie-Go 플랫폼 프론트엔드 개발</li>
                <li>회원 관리 및 무선 충전기 관리 등 주요 기능 UI 및 로직 구현</li>
                <li>React Query 활용 서버 상태 관리 및 react-hook-form 기반 폼 개발</li>
                <li>애자일(스프린트) 환경 내 개발, 코드 리뷰, 회고 참여</li>
                <li>PO, 디자이너, 백엔드 개발자와 협업하여 기능 개선 및 요구사항 반영</li>
              </ul>
            </div>

            <div className="project">
              <h4>로봇 서비스 운영 매니저</h4>
              <span className="time">
                <time dateTime="2023-12">2023. 12.</time> - <time dateTime="2024-07">2024. 07.</time> (8개월)
              </span>
              <h5>주요 업무 및 성과</h5>
              <ul>
                <li>수동 리포팅 비효율 개선 위해 '딸깍이' 기획 및 Full-stack 개발 주도 (React, Node.js 등)</li>
                <li>'딸깍이' 적용 통한 팀 생산성 증대 및 6,000건+ 이슈 데이터 체계화 (사내 공식 플랫폼 채택)</li>
                <li>원격 게임패드 기반 경로 취득 기능 구현 (업무 시간 1/3 단축)</li>
                <li>로봇 서비스 현장 셋업, 경로 취득, 테스트, 사용자 교육 등 SOM 역할 수행</li>
                <li>다양한 기술팀(엔지니어링, 자율주행, 플랫폼)과의 협업 경험 및 커뮤니케이션 역량 강화</li>
                <li>(프론트엔드 개발 직무로 전환)</li>
              </ul>
            </div>

            <div className="project">
              <h4>로봇 서비스 운영 지원</h4>
              <span className="time">
                <time dateTime="2023-06">2023. 06.</time> - <time dateTime="2023-11">2023. 11.</time> (6개월)
              </span>
              <h5>주요 업무</h5>
              <ul>
                <li>자율주행 로봇 실시간 모니터링 및 필요시 원격 제어</li>
                <li>운영 중 발생하는 이슈 리포팅 및 데이터 기록</li>
                <li>현장 운영 경험 축적 및 서비스 개선점 파악</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2>프로젝트</h2>
        <div className="row">
          <div className="row-left">
            <h3>지도 프로젝트</h3>
          </div>
          <div className="row-right">
            <h4>경로 시각화 및 경로 생성</h4>
            <span className="time">
              <time dateTime="2025-04">2025. 04.</time> – 현재
            </span>
            <h5>개요</h5>
            <p>
              Mapbox GL을 활용해 미리 정의된 경로를 지도 위에 시각화하고, 차후 Geolocation API로 사용자 위치 기반 경로
              생성 기능을 추가할 예정인 프로젝트입니다.
            </p>
            <h5>역할</h5>
            <p>프론트엔드 기획·설계·개발 전반 (커스텀 훅, 컴포넌트, 타입 정의, 반응형 UI/애니메이션)</p>
            <h5>주요 기능 및 구현</h5>
            <ul>
              <li>GeoJSON LineString 경로를 Mapbox Source/Layer로 렌더링</li>
              <li>
                <strong>usePathAnimation</strong> 훅: 경로 보간(interpolation)으로 마커 이동, 속도 기반 남은 거리 계산
              </li>
              <li>follow 모드: 마커 위치에 따라 카메라 자동 이동(flyTo)</li>
              <li>반응형 UI: 모바일 하단 플로팅 메뉴</li>
              <li>차후 기능: Geolocation API 연동해 실시간 사용자 위치 기반 경로 생성 로직 도입 예정</li>
            </ul>
            <h5>성과</h5>
            <ul>
              <li>재사용 가능한 훅/컴포넌트 구조로 유지보수성·확장성 대폭 향상</li>
              <li>지도 기반 시각화로 사용자 경험(UX) 개선</li>
            </ul>
            <h5>사용 기술</h5>
            <ul>
              <li>Front‑end: React, Next.js, TypeScript</li>
              <li>지도: Mapbox GL</li>
            </ul>
            <h5>관련 링크</h5>
            <a href="https://jiwonyoon.dev/map" target="_blank" rel="noopener">
              jiwonyoon.dev/map
            </a>
          </div>
        </div>

        <div className="row">
          <div className="row-left">
            <h3>딸깍이</h3>
          </div>
          <div className="row-right">
            <h4>로봇 이슈 리포팅 및 관리 자동화 도구</h4>
            <span className="time">
              <time dateTime="2023-10">2023. 10.</time> - 현재 (재직 기간 중 약 1년 이상 개발 및 개선)
            </span>
            <h5>개요</h5>
            <p>
              자율주행 로봇 모니터링 시 수동 타이핑의 비효율과 위험성을 해결하기 위해 개발한 게임패드 기반 이슈 기록 및
              리포팅 자동화 시스템
            </p>
            <h5>역할</h5>
            <p>기획, 설계, Full-stack 개발 (Front-end: Chrome Extension, React / Back-end: Node.js) 및 유지보수</p>
            <h5>주요 기능 및 구현</h5>
            <ul>
              <li>Chrome Extension 활용 기존 플랫폼 비침투적 기능 구현</li>
              <li>WebSocket/XMLHttpRequest 데이터 가로채기 기반 실시간 로봇 상태 정보 수집</li>
              <li>Gamepad API 연동, 버튼 클릭 시 타임스탬프 및 데이터 자동 기록 (Local Storage 활용)</li>
              <li>React 기반 이슈 분류/코멘트 UI 개발 및 실시간 상태 반영</li>
              <li>Node.js 서버: 데이터 처리, Google Sheets 연동(우선순위 관리), 서버 캐싱(성능 최적화)</li>
              <li>Slack/Jira API 연동: 자동 알림 및 티켓 생성 통한 체계적 이슈 관리 및 협업 지원</li>
            </ul>
            <h5>성과</h5>
            <ul>
              <li>6,000건 이상의 이슈 데이터 체계화 및 관리</li>
              <li>업무 시간 단축: 수동 리포팅 10분 → 자동화 후 1분</li>
              <li>사내 공식 플랫폼으로 채택 및 팀 생산성 향상 기여</li>
              <li>기술적 솔루션을 통한 팀 내 비효율 문제 해결 및 개선</li>
            </ul>
            <h5>사용 기술</h5>
            <ul>
              <li>Front-end: React, Chrome Extension API</li>
              <li>Back-end: Node.js, Express.js</li>
              <li>Database: Google Sheets API</li>
              <li>협업 도구: Slack API, Jira API</li>
            </ul>
            <h5>관련 링크</h5>
            <a href="https://jiwonbot.tistory.com/23" target="_blank">
              게임패드로 로봇 이슈 기록하기: 딸깍이 개발 과정
            </a>
          </div>
        </div>
      </section>
      <section>
        <h2>연락처</h2>
        <ul>
          <li>
            <a href="mailto:jiwonyoon.dev@gamil.com">이메일</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/jiwonyoondev" target="_blank">
              LinkedIn 프로필
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
