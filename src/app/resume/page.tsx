import React from 'react'
import Image from 'next/image'
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
        <h1>프론트엔드 개발자 윤지원 이력서</h1>
      </section>
      <section>
        <h2>기술 스택</h2>
        <div className="section-divider">
          <h3>프론트엔드 개발</h3>
          <SkillItem
            skill="TypeScript"
            level={3}
            description="TypeScript의 기본적인 타입 시스템과 더불어 인터페이스, 제네릭, 유니온/교차 타입 등 일부 고급 기능을 활용하여 코드의 안정성을 향상시키는 데 기여할 수 있습니다. React 프로젝트에 TypeScript를 적용하여 개발한 경험이 있으며, 점진적인 타입 적용 및 DefinitelyTyped와 같은 타입 정의 파일 활용에 대해 학습하고 있습니다."
          />
          <SkillItem
            skill="React"
            level={3}
            description="React의 컴포넌트 기반 아키텍처와 Hooks를 이용한 효율적인 상태 관리, 기본적인 라이프사이클 메서드에 대한 이해를 바탕으로 사용자 인터페이스 개발 경험이 있습니다. [예시: 실무 프로젝트에서 특정 UI 컴포넌트를 개발하거나 사용자 인터랙션 기능을 구현했습니다.] 성능 최적화 및 Redux, Context API와 같은 고급 상태 관리 기법에 대한 학습을 꾸준히 진행하고 있습니다."
          />
          <SkillItem
            skill="Next.js"
            level={3}
            description="기본적인 기능인 서버 사이드 렌더링 (SSR), 정적 사이트 생성 (SSG), API 라우팅에 대한 이해를 바탕으로 간단한 웹 애플리케이션을 개발할 수 있습니다. 개인 프로젝트 및 일부 실무 경험을 통해 Next.js를 사용해 본 경험이 있으며, Next.js의 고급 기능 및 성능 최적화에 대한 학습을 진행하고 있습니다."
          />
          <SkillItem
            skill="React Query"
            level={3}
            description="React 애플리케이션에서 서버 상태 관리를 위한 React Query의 기본적인 사용법을 이해하고 있으며, 비동기 데이터 fetching, 캐싱, 업데이트 등의 기능을 활용한 경험이 있습니다. [예시: 개인 프로젝트에서 API 연동을 통해 데이터를 가져오고 관리하는 기능을 구현했습니다.] 고급 캐싱 전략 및 stale-while-revalidate와 같은 최적화 기법에 대해 학습하고 있습니다."
          />
        </div>
        <div className="section-divider">
          <h3>협업 및 프로젝트 관리</h3>
          <SkillItem
            skill="Figma"
            level={3}
            description="UI/UX 디자인 도구 Figma를 활용하여 와이어프레임 및 프로토타입 제작 경험이 있으며, 디자인 시스템에 대한 이해를 바탕으로 협업에 필요한 디자인 결과물을 효과적으로 활용할 수 있습니다. [예시: 프로젝트에서 Figma를 사용하여 와이어프레임을 제작하고 팀원들과 공유했습니다.]"
          />
          <SkillItem
            skill="Jira"
            level={3}
            description="Jira를 활용하여 프로젝트 이슈 관리, 작업 추적 경험이 있으며, 애자일 개발 프로세스에 대한 이해를 바탕으로 팀 협업 효율성을 높이는 데 기여할 수 있습니다."
          />
          <SkillItem
            skill="Confluence"
            level={3}
            description="Confluence를 활용하여 문서 작성, 협업 공간 관리, 지식 공유 경험이 있으며, 팀 내 원활한 커뮤니케이션을 지원할 수 있습니다."
          />
          <SkillItem
            skill="Git"
            level={3}
            description="버전 관리 시스템 Git을 활용하여 코드 관리, 협업 브랜치 관리, 코드 리뷰 등의 경험이 있으며, Git Flow와 같은 협업 프로세스에 대한 이해를 바탕으로 효율적인 팀 협업을 지원할 수 있습니다."
          />
        </div>
      </section>
      {/*<section>*/}
      {/*  <h2>주요 프로젝트</h2>*/}
      {/*</section>*/}
      <section>
        <h2>경력 사항</h2>

        <div className="row">
          <div className="row-left">
            <h3>NEUBILITY</h3>
            <span className="role">Frontend Developer</span>
            <span>
              <time dateTime="2025-03">2025. 03.</time> - 현재
            </span>
          </div>
          <div className="row-right">
            <h4>Neubie-Go</h4>
            <span>로봇 상태 모니터링, 제어 등 웹 기반 관제 플랫폼 개발 참여</span>

            <div className="project">
              <h5>주요 업무</h5>
              <ul>
                <li>Next.js 기반의 로봇 웹 관제 플랫폼 개발 참여</li>
                <li>예: 로봇 실시간 상태 데이터 시각화 기능 개발]</li>
                <li>예: 사용자 인터페이스(UI) 및 사용자 경험(UX) 개선 작업]</li>
                <li>[백엔드 API 연동 및 데이터 처리]</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="row-left">
            <h3>NEUBILITY</h3>
            <span className="role">Frontend Developer</span>
            <span>
              <time dateTime="2024-08">2024. 08.</time> - <time dateTime="2024-11">2024. 11.</time>
            </span>
          </div>
          <div className="row-right">
            <h4>Neubie-Go</h4>
            <span>로봇 상태 모니터링, 제어 등 웹 기반 관제 플랫폼 개발 참여</span>

            <div className="project">
              <h5>주요 업무</h5>
              <ul>
                <li>Next.js 기반의 로봇 웹 관제 플랫폼 개발 참여</li>
                <li>예: 로봇 실시간 상태 데이터 시각화 기능 개발]</li>
                <li>예: 사용자 인터페이스(UI) 및 사용자 경험(UX) 개선 작업]</li>
                <li>[백엔드 API 연동 및 데이터 처리]</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="section-divider">
          <h2>주요 경험 및 역량</h2>
          <div className="project">
            <h5>빠른 학습 및 성장</h5>
            <ul>
              <li>
                새로운 기술이나 지식에 대한 이해도가 빠르며, 부족한 부분을 신속하게 파악하고 보완하여 요구사항을
                충족하는 완성도 높은 결과물을 기한 내에 만들어낼 수 있습니다.
              </li>
              <li>
                개발에 대한 높은 열정을 바탕으로 꾸준히 학습하고 성장하며, 어려운 과제에도 적극적으로 도전하여 역량을
                빠르게 향상시켜 왔습니다.
              </li>
            </ul>
          </div>
          <div className="project">
            <h5>뛰어난 도메인 이해도</h5>
            <ul>
              <li>
                뉴비고 서비스 및 로봇 웹 관제 플랫폼에 대한 깊이 있는 이해를 바탕으로 개발 업무를 수행하고 있으며,
                회의에서도 사용자 관점의 실질적인 의견과 인사이트를 제시하여 프로덕트 발전에 기여하고 있습니다.
              </li>
              <li>
                실제 운영 경험을 통해 얻은 도메인 지식을 바탕으로 개발 과정에서 발생할 수 있는 문제점을 예측하고
                예방하며, 효율적인 솔루션을 제시합니다.
              </li>
            </ul>
          </div>
          <div className="project">
            <h5>적극적인 문제 해결 능력 및 실행력</h5>
            <ul>
              <li>
                과거 서비스 운영팀에서의 경험을 바탕으로 제한된 자원으로도 큰 임팩트를 낼 수 있는 개선 사항들을
                적극적으로 발굴하고 실행하여 플랫폼 발전에 기여했습니다.
              </li>
              <li>
                문제 해결에 대한 강한 의지를 가지고 있으며, 스스로 문제점을 찾아 분석하고 해결하기 위해 노력합니다.
                "딸깍이" 기능 개발 및 배포를 통해 업무 효율성을 향상시킨 경험이 있습니다.
              </li>
              <li>새로운 아이디어를 적극적으로 제안하고 실행하며, 맡은 업무에 대해 높은 책임감을 가지고 완수합니다.</li>
            </ul>
          </div>
          <div className="project">
            <h5>뛰어난 협업 및 소통 능력</h5>
            <ul>
              <li>
                팀원들과 원활하게 소통하고 적극적으로 협력하여 시너지를 창출하며, 어려운 문제에 직면했을 때도 동료들의
                도움을 효과적으로 활용하여 완성도 높은 결과물을 만들어냅니다.
              </li>
              <li>
                회의 및 코드 리뷰 과정에서 적극적으로 의견을 개진하고 다른 팀원들의 의견을 경청하며, 긍정적인 협업
                분위기를 조성합니다.
              </li>
              <li>
                백엔드 개발자와의 API 연동 등 협업 과정에서 발생할 수 있는 이슈를 빠르게 공유하고 해결하며, 효율적인
                개발 프로세스를 구축하는 데 기여합니다.
              </li>
            </ul>
          </div>
          <div className="project">
            <h5>실질적인 기여 및 성과 창출</h5>
            <ul>
              <li>
                뉴비고 플랫폼 개발에 참여하여 회원 관리 수정, 모니터링 로봇 검색 기능, 사이트 관리 로봇 배정 플로우 개선
                등 다양한 기능을 성공적으로 구현하여 사용자 편의성을 향상시키고 업무 효율성을 높였습니다.
              </li>
              <li>
                모바일 경로 생성 기능 개발 및 신규 사이트 셋업 등 중요한 프로젝트에 적극적으로 참여하여 성과를
                창출했습니다.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="section-divider">
          <h2>마지막으로 드리고 싶은 말씀</h2>
          <p>
            비록 개발 경력이 짧고 비전공자이지만, 개발이라는 분야와 더불어 [회사 상품]가 가진 혁신적인 가능성에 깊이
            매료되어 뜨거운 열정을 가지고 있습니다. 주어진 역할에 최선을 다하는 것은 물론, 끊임없는 학습과 성장을 통해
            기대 이상의 성과를 만들어낼 수 있다고 확신합니다.
          </p>
          <p>
            특히,
            <a href="https://www.linkedin.com/in/jetty8013" target="_blank">
              링크드인
            </a>
            에서 확인하실 수 있는 두 건의 추천서는 저의 성실함과 잠재력을 간접적으로 보여주는 증거라고 생각합니다.
            정규직 채용이 부담스러우시다면, 계약직으로라도 먼저 기회를 주셔서 제가 가진 열정과 능력을 증명해
            보이겠습니다.
          </p>

          <Image src="/images/recommendations.png" alt="링크드인 추천서" width={1446 / 2} height={2126 / 2} />
        </div>
      </section>
      <section>
        <h2>연락처</h2>
        <ul>
          <li>
            <a href="mailto:jetty8013@gamil.com">이메일</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/jetty8013" target="_blank">
              LinkedIn 프로필
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
