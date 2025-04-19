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

const SkillItem = ({ skill, level }: { skill: string; level: number }) => {
  return (
    <div className="project">
      <div className="flex items-center">
        <h5 className="mr-4">{skill}</h5>
        <SkillLevel level={level} />
      </div>
    </div>
  )
}

export default function ResumePage() {
  return (
    <div className="container">
      <section>
        <div className="section-divider">
          <h2>
            문제를 찾아 기술로 해결하는, <br />
            주도적인 개발자 윤지원입니다.
          </h2>
          <p>
            <strong>빠른 템포의 개발 환경에 익숙하며</strong>, <strong>Next.js와 TypeScript 기반으로</strong> 문제
            해결에 집중해 프론트엔드 프로젝트를 성공적으로 수행해왔습니다.
          </p>
          <p>
            자율주행 로봇 회사에서 <strong>이슈 리포터 서비스를 기획·개발</strong>해 사내 공식 플랫폼으로 채택되는
            성과를 이루었고,
            <strong>애자일 환경</strong>에서 협업 역량을 강화했습니다.
          </p>
          <p>
            <strong>저의 협업 능력과 성과에 대한 동료들의 긍정적인 평가</strong>는
            <a href="https://www.linkedin.com/in/jiwonyoondev" target="_blank" rel="noopener noreferrer">
              LinkedIn 프로필
            </a>
            에서 확인하실 수 있습니다.
          </p>
        </div>
      </section>

      <section>
        <h2>스킬</h2>
        <div className="section-divider grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <SkillItem skill="Problem Solving" level={4} />
            <p>
              현장 업무의 비효율을 스스로 발견하고 이슈 리포터 서비스라는 기술적 솔루션을 기획·구현·개선하여 팀 생산성을
              높이고 사내 공식 플랫폼으로 채택되는 성과를 이끌어냈습니다. 6,000건 이상의 이슈를 체계적으로 관리하고 업무
              시간을 대폭 단축했습니다.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <SkillItem skill="Next.js" level={2} />
            <p>회사 프로젝트에서 Next.js 기반 회원 관리 기능을 개발하며 페이지 기반 라우팅 환경을 경험했습니다.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <SkillItem skill="TypeScript" level={3} />
            <p>
              Next.js 기반 실무 프로젝트에서 제네릭과 유틸리티 타입을 활용해 컴포넌트와 함수의 재사용성을 높이고 타입
              안정성을 강화했습니다.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <SkillItem skill="React" level={3} />
            <p>
              이슈 리포터 서비스 UI 개발 및 상태 관리를 Hooks로 수행했으며, 컴포넌트 라이프사이클 이해를 바탕으로 부수
              효과를 효과적으로 관리했습니다. 또한 Next.js 프로젝트에서 Custom Hook과 컴포넌트 기반 기능(회원 관리 등)을
              구현한 경험이 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>경력 사항</h2>
        <div className="section-divider">
          <h3>뉴빌리티</h3>
          <span className="time">
            <time dateTime="2023-06">2023.06 – 현재</time>
          </span>
          <p>
            뉴빌리티는 실내·외 자율주행 로봇 서비스 전문 스타트업으로, 카메라 기반 V‑SLAM과 AI 객체 인식 기술을 활용해
            배달 및 순찰용 자율주행 로봇 ‘뉴비(NEUBIE)’를 개발·운영합니다.
          </p>
          <br />
          <br />

          <h5>프론트엔드 개발</h5>
          <span className="time">
            <time dateTime="2025-03">2025.03 – 현재</time>
            <br />
            <time dateTime="2024-08">2024.08 – 2024.10</time> (3개월)
          </span>

          <p>
            프론트엔드 개발 직무는 플랫폼 UI/UX 구현, 상태 관리, API 연동 및 폼 개발을 담당하며, 뉴비고(로봇 관제·경로
            관리)와 배달 플랫폼 뉴비오더(고객·점주용) 프론트엔드를 개발했습니다.
          </p>

          <p>
            주로 Next.js, React, TypeScript를 사용하여 플랫폼 프론트엔드를 개발했으며, React Query로 서버 상태를
            효율적으로 관리하고 react-hook-form으로 안정적인 폼을 구현했습니다. 또한 NX 기반 모노레포 환경을 구성할 수
            있고, CI/CD 파이프라인을 설정해 배포 자동화를 구현할 수 있습니다.
          </p>

          <br />
          <h5>로봇 서비스 운영 매니저</h5>

          <span className="time">
            <time dateTime="2023-12">2023.12 – 2024.07</time> (8개월)
          </span>

          <p>
            로봇 서비스 운영 매니저는 자율주행 로봇의 현장 배치·운영 모니터링·경로 최적화·이슈 대응·사용자 교육을
            총괄하는 직무입니다.
          </p>

          <p>
            본래 운영 업무를 맡으며 현장 이슈를 직접 관리했으나, 반복되는 비효율을 해결하기 위해 React와 Node.js를
            활용한 이슈 리포터 서비스 기획·개발을 주도했습니다. 이를 통해 6,000건 이상의 이슈 데이터를 체계화하고 팀
            생산성을 크게 향상시켰습니다. 또한 다양한 기술팀과 협업하며 커뮤니케이션 역량을 강화하고, 해당 경험을
            바탕으로 프론트엔드 개발 직무로 성공적으로 전환했습니다.
          </p>
          <br />

          <h5>로봇 서비스 운영 지원</h5>
          <span className="time">
            <time dateTime="2023-06">2023.06 – 2023.11</time> (6개월)
          </span>
          <p>
            로봇 서비스 운영 지원은 자율주행 로봇의 실시간 모니터링·원격 제어·이슈 리포팅·데이터 기록을 담당하는
            역할입니다.
          </p>

          <p>
            현장 운영 지원 역할로서 자율주행 로봇의 상태를 실시간으로 관찰하고 필요 시 원격으로 제어했으며, 발생한
            이슈를 체계적으로 리포팅하고 데이터를 기록했습니다. 이렇게 축적된 현장 경험을 바탕으로 서비스 개선점을
            도출하고, 관련 기술팀과 협업하여 운영 효율을 향상시키는 데 기여했습니다.
          </p>
        </div>
      </section>

      <section>
        <h2>프로젝트</h2>
        <div className="section-divider">
          {/* 지도 프로젝트 */}
          <div className="project">
            <h4>지도 프로젝트</h4>
            <h5>경로 시각화 및 경로 생성</h5>
            <span className="time">
              <time dateTime="2025-04">2025.04 – 현재</time>
            </span>
            <p className="role-desc">
              프론트엔드 기획·설계·개발 전반을 담당했습니다 (커스텀 훅, 컴포넌트, 타입 정의, 반응형 UI·애니메이션).
            </p>
            <p>
              Mapbox GL로 미리 정의된 경로를 시각화하고, usePathAnimation 훅으로 마커 보간(interpolation)과 속도 기반
              거리 계산을 구현했습니다. follow 모드를 통해 카메라 자동 이동을 지원하며, 모바일 반응형 UI를 적용했고,
              차후 Geolocation API 연동을 계획 중입니다.
            </p>
            <p>
              주요 기술: React, Next.js, TypeScript, Mapbox GL
              <br />
              <br />
              <a href="https://jiwonyoon.dev/map" target="_blank" rel="noopener">
                jiwonyoon.dev/map
              </a>
            </p>
          </div>

          {/* 이슈 리포터 서비스 */}
          <div className="project">
            <h4>이슈 리포터 서비스</h4>
            <h5>로봇 이슈 리포팅 및 관리 자동화 도구</h5>
            <span className="time">
              <time dateTime="2023-10">2023.10 – 2024.11</time>
            </span>
            <p className="role-desc">
              Full‑stack 기획·설계·개발 및 유지보수를 수행했습니다 (Front-end: Chrome Extension, React / Back-end:
              Node.js).
            </p>
            <p>
              게임패드 기반 이슈 기록·리포팅 자동화 시스템을 개발해 자율주행 로봇 모니터링의 수동 타이핑 비효율을
              해소했습니다. WebSocket/XMLHttpRequest 가로채기로 실시간 상태를 수집하고, Gamepad API 연동 및 Slack/Jira
              API 통합으로 이슈 관리 프로세스를 체계화했습니다.
            </p>
            <p>
              주요 기술: React, Chrome Extension API, Node.js, Express.js, Google Sheets API, Slack API, Jira API
              <br />
              <br />
              <a href="https://jiwonbot.tistory.com/23" target="_blank">
                게임패드로 로봇 이슈 기록하기: 이슈 리포터 서비스 개발 과정
              </a>
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>연락처</h2>
        <p>연락을 원하시면 아래의 방법으로 연락주세요.</p>
        <ul>
          <li>
            <a href="mailto:jiwonyoon.dev@gmail.com">이메일</a>
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
