import { useState } from 'react'
import './App.css'

const navItems = [
  { id: 'home', label: '대시보드', icon: '◫' },
  { id: 'report', label: '변화 리포트', icon: '▥' },
  { id: 'care', label: '인지 웰니스', icon: '✳' },
  { id: 'places', label: '주변 기관', icon: '⌖' },
]

const calls = [
  { time: '오후 2:18', person: '딸, 서연님', duration: '12분 34초', note: '오늘 일정에 대해 대화했어요', tone: 'mint', icon: '♡' },
  { time: '오전 10:42', person: '아들, 민준님', duration: '8분 12초', note: '안부와 식사 이야기를 나눴어요', tone: 'peach', icon: '☏' },
  { time: '어제 오후 7:05', person: '딸, 서연님', duration: '15분 08초', note: '저녁 메뉴를 함께 이야기했어요', tone: 'lavender', icon: '♡' },
]

const activities = [
  { id: 1, icon: '☀', title: '아침 스트레칭', detail: '몸을 깨우는 5분 건강 체조', time: '5분', color: 'sun' },
  { id: 2, icon: '▤', title: '오늘의 낱말 카드', detail: '그림을 보고 단어를 떠올려요', time: '10분', color: 'sky' },
  { id: 3, icon: '♫', title: '추억의 노래 듣기', detail: '익숙한 노래와 기억을 나눠요', time: '12분', color: 'lilac' },
]

function Icon({ children, className = '' }) {
  return <span className={`icon ${className}`} aria-hidden="true">{children}</span>
}

function App() {
  const [activeNav, setActiveNav] = useState('home')
  const [period, setPeriod] = useState('주간')
  const [completed, setCompleted] = useState([])
  const [notice, setNotice] = useState(false)
  const [showCall, setShowCall] = useState(false)

  const activeLabel = navItems.find((item) => item.id === activeNav)?.label ?? '대시보드'
  const toggleActivity = (id) => setCompleted((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" onClick={() => setActiveNav('home')} aria-label="마음온 홈">
          <span className="brand-mark"><span>m</span></span>
          <span className="brand-name">마음온<span>maeum:on</span></span>
        </a>

        <div className="side-caption">함께 돌보기</div>
        <nav className="side-nav" aria-label="주 메뉴">
          {navItems.map((item) => (
            <button key={item.id} className={`nav-item ${activeNav === item.id ? 'active' : ''}`} onClick={() => setActiveNav(item.id)}>
              <Icon>{item.icon}</Icon><span>{item.label}</span>
              {item.id === 'report' && <span className="nav-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />
        <div className="family-card">
          <div className="family-card-top"><span className="online-dot" />가족 연결됨</div>
          <div className="family-avatars"><span className="avatar avatar-rose">서</span><span className="avatar avatar-blue">민</span><span className="avatar-add">＋</span></div>
          <p>서연님, 민준님과<br />함께 돌보고 있어요.</p>
          <button className="text-button" onClick={() => setNotice(true)}>가족 관리 <span>→</span></button>
        </div>
        <button className="nav-item settings-item" onClick={() => setNotice(true)}><Icon>⚙</Icon><span>설정</span></button>
        <div className="profile-row"><div className="avatar avatar-profile">김</div><div className="profile-copy"><strong>김정희 어르신</strong><span>마음온 이용 중</span></div><button className="more-button" aria-label="프로필 메뉴" onClick={() => setNotice(true)}>···</button></div>
      </aside>

      <main className="main-content" id="home">
        <header className="topbar">
          <div className="breadcrumb">마음온 <span>/</span> {activeLabel}</div>
          <div className="top-actions"><span className="today-date">2026년 9월 26일 토요일</span><button className="notification-button" aria-label="알림 보기" onClick={() => setNotice(true)}><Icon>♧</Icon><i /></button><div className="avatar avatar-profile top-avatar">김</div></div>
        </header>

        <div className="page-wrap">
          <section className="welcome-row">
            <div><div className="eyebrow"><span className="eyebrow-spark">✳</span> 토요일, 천천히 시작해요</div><h1>정희 어르신의 하루<span className="title-period">.</span></h1><p className="welcome-sub">가족의 따뜻한 안부가 오늘도 이어지고 있어요.</p></div>
            <button className="outline-button" onClick={() => { setActiveNav('report'); setPeriod('주간') }}><Icon>▥</Icon> 주간 리포트 보기 <span>↗</span></button>
          </section>

          <section className="care-banner">
            <div className="banner-icon"><span>♡</span></div>
            <div className="banner-copy"><strong>오늘도 평소와 비슷한 대화 흐름이에요</strong><span>최근 통화 3건을 살펴봤어요. 꾸준한 안부 전화가 큰 힘이 돼요.</span></div>
            <div className="banner-meta"><span className="banner-live" />오늘 통화 분석 완료</div>
          </section>

          {activeNav === 'home' && <div className="dashboard-grid">
            <section className="panel status-panel">
              <div className="panel-heading"><div><div className="section-kicker">마음 체크</div><h2>인지 대화 흐름</h2></div><button className="help-button" aria-label="인지 대화 흐름 안내" onClick={() => setNotice(true)}>?</button></div>
              <div className="status-content">
                <div className="score-ring"><div className="score-ring-inner"><span>이번 주</span><strong>안정</strong><small>대화 흐름</small></div></div>
                <div className="status-copy"><div className="status-pill"><span />평소와 비슷해요</div><p>최근 통화에서 큰 변화 없이<br />익숙한 대화를 이어가셨어요.</p><button className="inline-link" onClick={() => setActiveNav('report')}>자세히 보기 <span>→</span></button></div>
              </div>
              <div className="privacy-note"><Icon>♡</Icon><span>대화 흐름을 참고로 살펴봐요. 의료 진단을 대신하지 않아요.</span></div>
            </section>

            <section className="panel trend-panel">
              <div className="panel-heading trend-heading"><div><div className="section-kicker">천천히 살펴보기</div><h2>대화 흐름 변화</h2></div><div className="segmented-control" role="group" aria-label="리포트 기간">{['주간', '월간'].map((item) => <button key={item} className={period === item ? 'selected' : ''} onClick={() => setPeriod(item)}>{item}</button>)}</div></div>
              <div className="chart-summary"><strong>안정적인 흐름</strong><span>지난 {period === '주간' ? '7일' : '4주'} 동안 꾸준해요 <i>↗</i></span></div>
              <div className="chart-wrap"><div className="chart-y-labels"><span>원활</span><span>보통</span><span>살펴봄</span></div><svg className="trend-chart" viewBox="0 0 480 142" role="img" aria-label="최근 대화 흐름 변화 그래프"><defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#87cdb4" stopOpacity=".24"/><stop offset="100%" stopColor="#87cdb4" stopOpacity="0"/></linearGradient></defs><path className="gridline" d="M0 22H480M0 66H480M0 110H480"/><path className="area-path" d="M8 79 C38 75 47 54 80 60 S126 76 151 54 S194 42 220 57 S263 79 292 61 S335 70 362 45 S408 52 432 39 S460 45 472 31 L472 126 L8 126 Z"/><path className="line-path" d="M8 79 C38 75 47 54 80 60 S126 76 151 54 S194 42 220 57 S263 79 292 61 S335 70 362 45 S408 52 432 39 S460 45 472 31"/><circle cx="472" cy="31" r="5" className="chart-point"/></svg></div>
              <div className="chart-x-labels">{(period === '주간' ? ['월', '화', '수', '목', '금', '토', '일'] : ['1주', '2주', '3주', '4주']).map((day) => <span key={day}>{day}</span>)}</div>
              <div className="chart-footnote"><span className="legend-dot" />통화 속 대화 흐름 <span className="footnote-range">최근 {period === '주간' ? '7일' : '4주'} 기준</span></div>
            </section>

            <section className="panel calls-panel">
              <div className="panel-heading"><div><div className="section-kicker">마음이 이어진 시간</div><h2>최근 안부 통화 <span className="count-badge">3</span></h2></div><button className="subtle-arrow" onClick={() => setShowCall(true)}>전체 보기 <span>→</span></button></div>
              <div className="call-list">{calls.map((call, index) => <button className="call-row" key={call.time} onClick={() => setShowCall(true)}><span className={`call-icon ${call.tone}`}>{call.icon}</span><span className="call-info"><strong>{call.person}</strong><small>{call.note}</small></span><span className="call-time"><strong>{call.time}</strong><small>{call.duration}</small></span><span className="row-chevron">›</span></button>)}</div>
              <div className="call-note"><Icon>⌁</Icon><span>통화 내용은 동의한 범위에서만 분석돼요.</span><button aria-label="통화 분석 안내" onClick={() => setNotice(true)}>안내</button></div>
            </section>

            <section className="panel activity-panel">
              <div className="panel-heading"><div><div className="section-kicker">오늘의 작은 습관</div><h2>함께 해보는 웰니스</h2></div><button className="subtle-arrow" onClick={() => setActiveNav('care')}>모두 보기 <span>→</span></button></div>
              <div className="activity-list">{activities.map((activity) => { const done = completed.includes(activity.id); return <div className={`activity-row ${done ? 'is-done' : ''}`} key={activity.id}><div className={`activity-icon ${activity.color}`}>{activity.icon}</div><div className="activity-copy"><strong>{activity.title}</strong><span>{activity.detail}</span></div><span className="activity-time">{activity.time}</span><button className={`check-button ${done ? 'checked' : ''}`} aria-label={`${activity.title} ${done ? '완료 취소' : '완료 표시'}`} onClick={() => toggleActivity(activity.id)}>{done ? '✓' : ''}</button></div> })}</div>
              <div className="activity-footer"><span>오늘 <strong>{completed.length}/3</strong> 활동 완료</span><div className="progress-track"><span style={{ width: `${completed.length / 3 * 100}%` }} /></div><span className="activity-encouragement">작은 실천이 모여요 🌱</span></div>
            </section>
          </div>}

          {activeNav === 'report' && <section className="secondary-view">
            <div className="secondary-intro"><div><div className="section-kicker">가족과 함께 살펴봐요</div><h2>대화 흐름 리포트</h2><p>통화 속 대화의 변화를 일정한 기간 동안 참고할 수 있어요.</p></div><div className="segmented-control" role="group" aria-label="리포트 기간">{['주간', '월간'].map((item) => <button key={item} className={period === item ? 'selected' : ''} onClick={() => setPeriod(item)}>{item}</button>)}</div></div>
            <div className="report-summary-grid"><article className="panel report-stat"><span>살펴본 기간</span><strong>{period === '주간' ? '최근 7일' : '최근 4주'}</strong><small>가족 통화 12건</small></article><article className="panel report-stat"><span>대화 흐름</span><strong className="report-stable">안정적</strong><small>평소와 비슷한 흐름이에요</small></article><article className="panel report-stat"><span>가족과 나눈 시간</span><strong>2시간 18분</strong><small>함께 안부를 나눴어요</small></article></div>
            <article className="panel report-chart-card"><div className="panel-heading"><div><div className="section-kicker">기간별 추이</div><h2>천천히 살펴보는 대화 흐름</h2></div><span className="sample-tag">시연용 예시</span></div><div className="report-chart-large"><div className="chart-y-labels"><span>원활</span><span>보통</span><span>살펴봄</span></div><svg className="trend-chart" viewBox="0 0 480 142" role="img" aria-label="대화 흐름 변화 그래프"><path className="gridline" d="M0 22H480M0 66H480M0 110H480"/><path className="area-path" d="M8 79 C38 75 47 54 80 60 S126 76 151 54 S194 42 220 57 S263 79 292 61 S335 70 362 45 S408 52 432 39 S460 45 472 31 L472 126 L8 126 Z"/><path className="line-path" d="M8 79 C38 75 47 54 80 60 S126 76 151 54 S194 42 220 57 S263 79 292 61 S335 70 362 45 S408 52 432 39 S460 45 472 31"/><circle cx="472" cy="31" r="5" className="chart-point"/></svg></div><div className="chart-x-labels">{(period === '주간' ? ['월', '화', '수', '목', '금', '토', '일'] : ['1주', '2주', '3주', '4주']).map((day) => <span key={day}>{day}</span>)}</div><p className="report-disclaimer">이 리포트는 통화 속 대화 흐름을 바탕으로 한 참고 정보예요. 걱정되는 변화가 있다면 치매안심센터나 의료기관과 상담해 주세요.</p></article>
            <article className="panel report-family-note"><span className="center-icon">♡</span><div><strong>가족과 함께 변화를 나눠보세요</strong><p>평소와 다른 점이 계속 걱정된다면 어르신과 편안히 이야기를 나누고 전문가 상담을 권해 주세요.</p></div></article>
          </section>}

          {activeNav === 'care' && <section className="secondary-view"><div className="secondary-intro"><div><div className="section-kicker">매일의 작은 즐거움</div><h2>인지 웰니스 활동</h2><p>부담 없이, 즐거운 활동을 어르신의 하루에 더해 보세요.</p></div><span className="sample-tag">오늘 {completed.length}/3 완료</span></div><div className="wellness-grid">{activities.map((activity) => { const done = completed.includes(activity.id); return <article className="panel wellness-card" key={activity.id}><div className={`activity-icon ${activity.color}`}>{activity.icon}</div><span className="wellness-time">{activity.time}</span><h3>{activity.title}</h3><p>{activity.detail}</p><button className={`wellness-action ${done ? 'done' : ''}`} onClick={() => toggleActivity(activity.id)}>{done ? '완료했어요 ✓' : '활동 완료하기 →'}</button></article> })}</div><article className="panel wellness-tip"><div className="center-icon">✳</div><div><strong>즐거운 대화와 움직임이 좋은 시작이에요</strong><p>산책, 충분한 수면, 사람들과의 대화처럼 일상 속 건강 습관을 이어가 보세요. 몸 상태에 맞춰 무리하지 않는 것이 중요해요.</p></div></article></section>}

          {activeNav === 'places' && <PlacesView />}

          <section className="center-strip"><div className="center-icon">⌖</div><div><strong>가까운 곳에서 도움을 받아보세요</strong><span>치매안심센터에서 인지 건강 상담과 다양한 프로그램을 안내해 드려요.</span></div><button onClick={() => setActiveNav('places')}>주변 기관 찾기 <span>→</span></button></section>
          <footer className="page-footer"><span>마음온은 일상 속 안부를 함께 살펴보는 웰니스 서비스예요. 화면의 통화와 분석은 시연용 예시입니다.</span><button onClick={() => setNotice(true)}>개인정보 및 이용 안내</button></footer>
        </div>
      </main>

      {notice && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setNotice(false) }}><section className="dialog" role="dialog" aria-modal="true" aria-labelledby="notice-title"><button className="dialog-close" onClick={() => setNotice(false)} aria-label="닫기">×</button><div className="dialog-mark">♡</div><div className="section-kicker">마음온 안내</div><h2 id="notice-title">가족과 어르신의 동의가<br />가장 먼저예요</h2><p>통화 분석은 어르신과 통화 상대방이 충분히 안내받고 동의한 경우에만 진행돼요. 대화 흐름은 참고 정보이며, 치매 진단이나 의료 판단을 대신하지 않습니다.</p><div className="dialog-tip"><strong>걱정되는 변화가 있다면</strong><span>가까운 치매안심센터 또는 의료기관에 상담을 요청해 주세요.</span></div><button className="dialog-primary" onClick={() => setNotice(false)}>확인했어요</button></section></div>}
      {showCall && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowCall(false) }}><section className="dialog call-dialog" role="dialog" aria-modal="true" aria-labelledby="call-title"><button className="dialog-close" onClick={() => setShowCall(false)} aria-label="닫기">×</button><div className="call-detail-icon">♡</div><div className="section-kicker">오늘 오후 2:18 · 12분 34초</div><h2 id="call-title">서연님과 안부를 나눴어요</h2><p>오늘 일정과 점심 식사 이야기를 나눴어요. 익숙한 대화를 편안하게 이어가셨어요.</p><div className="detail-tags"><span>일상 대화</span><span>대화 흐름 안정</span><span>가족 통화</span></div><div className="dialog-tip"><strong>참고 안내</strong><span>이 요약은 통화 흐름을 바탕으로 한 참고 정보예요. 의료 진단으로 사용하지 마세요.</span></div><button className="dialog-primary" onClick={() => setShowCall(false)}>닫기</button></section></div>}
    </div>
  )
}

function PlacesView() {
  const [region, setRegion] = useState('')
  const [searched, setSearched] = useState(false)
  return <section className="secondary-view"><div className="secondary-intro"><div><div className="section-kicker">필요할 때 가까운 도움을</div><h2>주변 치매안심센터 찾기</h2><p>치매안심센터에서 상담, 조기 검진 안내와 가족 지원 프로그램을 받을 수 있어요.</p></div><span className="places-mark">⌖</span></div><article className="panel places-search"><label htmlFor="region-search">지역을 입력해 주세요</label><div className="search-row"><input id="region-search" value={region} onChange={(event) => setRegion(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') setSearched(true) }} placeholder="예: 서울시 종로구"/><button onClick={() => setSearched(true)}>기관 찾기 <span>→</span></button></div><small>{searched && region ? `‘${region}’ 주변 기관을 확인하려면 실제 위치 검색 서비스를 연결해 주세요.` : '지역 검색은 서비스 연동 후 이용할 수 있어요.'}</small></article><div className="place-list-heading"><strong>도움받을 수 있는 곳</strong><span>기관 정보는 관할 보건소에서 확인해 주세요</span></div><div className="place-list"><article className="panel place-card"><div className="place-symbol">✳</div><div className="place-card-copy"><span className="place-type">상담 · 검진 안내</span><h3>지역 치매안심센터</h3><p>인지 선별검사, 상담, 가족 지원 프로그램</p><small>가까운 센터 위치와 운영 시간은 관할 기관에서 확인할 수 있어요.</small></div><span className="place-arrow">↗</span></article><article className="panel place-card"><div className="place-symbol health">＋</div><div className="place-card-copy"><span className="place-type">건강 상담</span><h3>관할 보건소</h3><p>지역 인지 건강 서비스 및 연계 안내</p><small>방문 전 전화로 운영 시간과 지원 내용을 문의해 주세요.</small></div><span className="place-arrow">↗</span></article></div><p className="places-note">마음온 시연 화면에는 실시간 위치 검색이 연결되어 있지 않아요. 정확한 기관 정보는 중앙치매센터 또는 관할 보건소에서 확인해 주세요.</p></section>
}

export default App
