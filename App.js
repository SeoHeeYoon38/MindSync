import { useState } from 'react'
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const pages = [
  { id: 'home', label: '홈', icon: '⌂' },
  { id: 'report', label: '리포트', icon: '▤' },
  { id: 'care', label: '활동', icon: '✳' },
  { id: 'places', label: '기관 찾기', icon: '⌖' },
]

const activities = [
  { id: 'stretch', icon: '☀', title: '아침 스트레칭', detail: '몸을 깨우는 5분 건강 체조', duration: '5분', color: '#fbf1df', ink: '#c28c48' },
  { id: 'words', icon: '▤', title: '오늘의 낱말 카드', detail: '그림을 보고 단어를 떠올려요', duration: '10분', color: '#eaf4f4', ink: '#588993' },
  { id: 'music', icon: '♫', title: '추억의 노래 듣기', detail: '익숙한 노래와 기억을 나눠요', duration: '12분', color: '#f1eef8', ink: '#8b79a7' },
]

const calls = [
  { person: '딸, 서연님', time: '오후 2:18', detail: '오늘 일정에 대해 대화했어요', length: '12분 34초', color: '#edf6ef', icon: '♡' },
  { person: '아들, 민준님', time: '오전 10:42', detail: '안부와 식사 이야기를 나눴어요', length: '8분 12초', color: '#fbf0e7', icon: '☏' },
  { person: '딸, 서연님', time: '어제 오후 7:05', detail: '저녁 메뉴를 함께 이야기했어요', length: '15분 08초', color: '#f1eff8', icon: '♡' },
]

function Label({ children, style }) {
  return <Text style={[styles.label, style]}>{children}</Text>
}

function Heading({ children, style }) {
  return <Text style={[styles.heading, style]}>{children}</Text>
}

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>
}

function ActionLink({ children, onPress }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={styles.actionLink}><Text style={styles.actionLinkText}>{children}  ›</Text></Pressable>
}

function Metric({ title, value, note, color }) {
  return <Card style={styles.metricCard}><Label>{title}</Label><Text style={[styles.metricValue, color && { color }]}>{value}</Text><Text style={styles.metricNote}>{note}</Text></Card>
}

export default function App() {
  const [page, setPage] = useState('home')
  const [period, setPeriod] = useState('주간')
  const [done, setDone] = useState([])
  const [dialog, setDialog] = useState(null)
  const [region, setRegion] = useState('')
  const [searched, setSearched] = useState(false)
  function toggleActivity(id) {
    setDone((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id])
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.canvas} />
      <View style={styles.app}>
        <View style={styles.topbar}>
          <View style={styles.brandRow}>
            <View style={styles.brandMark}><Text style={styles.brandHeart}>♡</Text></View>
            <View><Text style={styles.brand}>토닥</Text><Text style={styles.brandCaption}>todak care</Text></View>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="알림과 개인정보 안내" onPress={() => setDialog('notice')} style={styles.bellButton}><Text style={styles.bell}>♧</Text><View style={styles.bellDot} /></Pressable>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.greeting}>
            <Text style={styles.eyebrow}>✳  토요일, 천천히 시작해요</Text>
            <Heading style={styles.greetingTitle}>정희 어르신의 하루<Text style={styles.greenDot}>.</Text></Heading>
            <Text style={styles.greetingSub}>가족의 따뜻한 안부가 오늘도 이어지고 있어요.</Text>
          </View>

          <View style={styles.banner}>
            <View style={styles.bannerIcon}><Text style={styles.bannerHeart}>♡</Text></View>
            <View style={styles.bannerCopy}><Text style={styles.bannerTitle}>오늘도 평소와 비슷한 대화 흐름이에요</Text><Text style={styles.bannerText}>최근 통화 3건을 살펴봤어요. 안부 전화가 큰 힘이 돼요.</Text></View>
          </View>

      {page === 'home' && <HomeScreen setPage={setPage} setDialog={setDialog} done={done} toggleActivity={toggleActivity} period={period} setPeriod={setPeriod} setCall={() => setDialog('call')} />}
          {page === 'report' && <ReportScreen period={period} setPeriod={setPeriod} />}
          {page === 'care' && <CareScreen done={done} toggleActivity={toggleActivity} />}
          {page === 'places' && <PlacesScreen region={region} setRegion={setRegion} searched={searched} setSearched={setSearched} />}

          <View style={styles.pageNote}><Text style={styles.pageNoteText}>토닥은 일상 속 안부를 함께 살펴보는 웰니스 서비스예요. 통화와 분석은 시연용 예시입니다.</Text><ActionLink onPress={() => setDialog('notice')}>이용 안내</ActionLink></View>
        </ScrollView>

        <View style={styles.tabBar}>
          {pages.map((item) => {
            const active = page === item.id
            return <Pressable key={item.id} accessibilityRole="tab" accessibilityState={{ selected: active }} onPress={() => setPage(item.id)} style={styles.tabItem}><Text style={[styles.tabIcon, active && styles.tabIconActive]}>{item.icon}</Text><Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{item.label}</Text></Pressable>
          })}
        </View>
      </View>

      <Modal transparent animationType="fade" visible={dialog !== null} onRequestClose={() => setDialog(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setDialog(null)}>
          <Pressable style={styles.dialog} onPress={(event) => event.stopPropagation()}>
            <View style={styles.dialogMark}><Text style={styles.dialogHeart}>{dialog === 'call' ? '♡' : '✳'}</Text></View>
            <Label>{dialog === 'call' ? '오늘 오후 2:18 · 12분 34초' : '토닥 안내'}</Label>
            <Heading style={styles.dialogTitle}>{dialog === 'call' ? '서연님과 안부를 나눴어요' : '가족과 어르신의 동의가 먼저예요'}</Heading>
            <Text style={styles.dialogCopy}>{dialog === 'call' ? '오늘 일정과 점심 식사 이야기를 나눴어요. 익숙한 대화를 편안하게 이어가셨어요.' : '화면의 통화와 분석 결과는 모두 시연용 예시예요. 실제 서비스를 만들 때는 어르신과 통화 상대방이 충분히 안내받고 동의한 경우에만 분석해야 해요. 대화 흐름은 참고 정보이며 치매 진단을 대신하지 않습니다.'}</Text>
            {dialog === 'call' && <View style={styles.tagRow}><Text style={styles.tag}>일상 대화</Text><Text style={styles.tag}>가족 통화</Text><Text style={styles.tag}>참고 정보</Text></View>}
            <View style={styles.dialogTip}><Text style={styles.dialogTipTitle}>걱정되는 변화가 있다면</Text><Text style={styles.dialogTipText}>가까운 치매안심센터 또는 의료기관에 상담을 요청해 주세요.</Text></View>
            <Pressable accessibilityRole="button" onPress={() => setDialog(null)} style={styles.primaryButton}><Text style={styles.primaryButtonText}>확인했어요</Text></Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  )
}

function HomeScreen({ setPage, setDialog, done, toggleActivity, period, setPeriod, setCall }) {
  return <View style={styles.sections}>
    <Card>
      <View style={styles.sectionHeader}><View><Label>마음 체크</Label><Heading>인지 대화 흐름</Heading></View><Pressable accessibilityRole="button" accessibilityLabel="분석 안내" onPress={() => setDialog('notice')} style={styles.helpButton}><Text style={styles.helpText}>?</Text></Pressable></View>
      <View style={styles.statusRow}><View style={styles.statusRing}><View style={styles.statusRingInner}><Text style={styles.ringCaption}>이번 주</Text><Text style={styles.ringValue}>안정</Text><Text style={styles.ringSub}>대화 흐름</Text></View></View><View style={styles.statusCopy}><Text style={styles.statusPill}>●  평소와 비슷해요</Text><Text style={styles.bodyCopy}>최근 통화에서 큰 변화 없이 익숙한 대화를 이어가셨어요.</Text><ActionLink onPress={() => setPage('report')}>자세히 보기</ActionLink></View></View>
      <View style={styles.divider} /><Text style={styles.privacyLine}>♡  참고 정보예요. 의료 진단을 대신하지 않아요.</Text>
    </Card>

    <Card>
      <View style={styles.sectionHeader}><View><Label>천천히 살펴보기</Label><Heading>대화 흐름 변화</Heading></View><PeriodPicker period={period} setPeriod={setPeriod} /></View>
      <View style={styles.chartSummary}><Text style={styles.chartSummaryStrong}>안정적인 흐름</Text><Text style={styles.chartSummaryNote}>지난 {period === '주간' ? '7일' : '4주'} 동안 꾸준해요 ↗</Text></View>
      <View style={styles.chart}><View style={styles.chartLabels}><Text style={styles.axisText}>원활</Text><Text style={styles.axisText}>보통</Text><Text style={styles.axisText}>살펴봄</Text></View><View style={styles.chartPlot}>{[58, 78, 67, 83, 62, 73, 92].map((height, index) => <View key={index} style={styles.chartColumn}><View style={styles.chartTrack}><View style={[styles.chartBar, { height: `${height}%` }]} /></View><Text style={styles.chartAxis}>{period === '주간' ? ['월', '화', '수', '목', '금', '토', '일'][index] : `${index + 1}주`}</Text></View>)}</View></View>
      <Text style={styles.privacyLine}>●  통화 속 대화 흐름 · 시연용 예시</Text>
    </Card>

    <Card>
      <View style={styles.sectionHeader}><View><Label>마음이 이어진 시간</Label><Heading>최근 안부 통화 <Text style={styles.countBadge}>2</Text></Heading></View><ActionLink onPress={setCall}>전체 보기</ActionLink></View>
      {calls.map((call, index) => <Pressable key={call.time} onPress={setCall} style={[styles.callRow, index === calls.length - 1 && styles.noBorder]}><View style={[styles.callIcon, { backgroundColor: call.color }]}><Text style={styles.callIconText}>{call.icon}</Text></View><View style={styles.callInfo}><Text style={styles.callName}>{call.person}</Text><Text style={styles.callDetail}>{call.detail}</Text></View><View style={styles.callWhen}><Text style={styles.callTime}>{call.time}</Text><Text style={styles.callLength}>{call.length}</Text></View></Pressable>)}
      <View style={styles.divider} /><Text style={styles.privacyLine}>통화 내용은 동의한 범위에서만 분석돼요.</Text>
    </Card>

    <ActivityCard done={done} toggleActivity={toggleActivity} setPage={setPage} />
    <CenterCard setPage={setPage} />
  </View>
}

function PeriodPicker({ period, setPeriod }) {
  return <View style={styles.segmented}>{['주간', '월간'].map((item) => <Pressable key={item} onPress={() => setPeriod(item)} style={[styles.segment, period === item && styles.segmentSelected]}><Text style={[styles.segmentText, period === item && styles.segmentTextSelected]}>{item}</Text></Pressable>)}</View>
}

function ActivityCard({ done, toggleActivity, setPage }) {
  return <Card>
    <View style={styles.sectionHeader}><View><Label>오늘의 작은 습관</Label><Heading>함께 해보는 웰니스</Heading></View><ActionLink onPress={() => setPage('care')}>모두 보기</ActionLink></View>
    {activities.map((item) => {
      const completed = done.includes(item.id)
      return <View key={item.id} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: item.color }]}><Text style={{ color: item.ink, fontSize: 17 }}>{item.icon}</Text></View><View style={styles.activityCopy}><Text style={styles.activityTitle}>{item.title}</Text><Text style={styles.activityDetail}>{item.detail}</Text></View><Text style={styles.activityDuration}>{item.duration}</Text><Pressable accessibilityRole="checkbox" accessibilityState={{ checked: completed }} accessibilityLabel={`${item.title} 완료`} onPress={() => toggleActivity(item.id)} style={[styles.checkButton, completed && styles.checkButtonDone]}><Text style={styles.checkMark}>{completed ? '✓' : ''}</Text></Pressable></View>
    })}
    <View style={[styles.divider, { marginTop: 4 }]} /><View style={styles.progressRow}><Text style={styles.progressText}>오늘 <Text style={styles.progressCount}>{done.length}/3</Text> 활동 완료</Text><View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${done.length / 3 * 100}%` }]} /></View><Text style={styles.encouragement}>작은 실천이 모여요 🌱</Text></View>
  </Card>
}

function CenterCard({ setPage }) {
  return <Pressable onPress={() => setPage('places')} style={styles.centerCard}><View style={styles.centerMark}><Text style={styles.centerPin}>⌖</Text></View><View style={styles.centerCopy}><Text style={styles.centerTitle}>가까운 곳에서 도움을 받아보세요</Text><Text style={styles.centerSub}>치매안심센터 상담과 프로그램을 안내해요.</Text></View><Text style={styles.centerArrow}>→</Text></Pressable>
}

function ReportScreen({ period, setPeriod }) {
  return <View style={styles.sections}><View style={styles.secondaryIntro}><View><Label>가족과 함께 살펴봐요</Label><Heading>대화 흐름 리포트</Heading><Text style={styles.bodyCopy}>통화 속 대화 변화를 기간별로 참고할 수 있어요.</Text></View></View><PeriodPicker period={period} setPeriod={setPeriod} /><View style={styles.metricGrid}><Metric title="살펴본 기간" value={period === '주간' ? '최근 7일' : '최근 4주'} note="가족 통화 12건" /><Metric title="대화 흐름" value="안정적" note="평소와 비슷해요" color={COLORS.green} /><Metric title="가족과 나눈 시간" value="2시간 18분" note="함께 안부를 나눴어요" /></View><Card><Label>기간별 추이 · 시연용 예시</Label><Heading>천천히 살펴보는 대화 흐름</Heading><View style={styles.largeChart}>{[62, 74, 63, 84, 57, 72, 90].map((height, index) => <View key={index} style={styles.largeChartColumn}><View style={styles.largeChartTrack}><View style={[styles.chartBar, { height: `${height}%` }]} /></View><Text style={styles.chartAxis}>{index + 1}주</Text></View>)}</View><Text style={styles.reportDisclaimer}>이 리포트는 통화 속 대화 흐름에 대한 참고 정보예요. 걱정되는 변화가 있다면 치매안심센터나 의료기관에 상담해 주세요.</Text></Card><View style={styles.tipCard}><Text style={styles.tipMark}>♡</Text><View style={{ flex: 1 }}><Text style={styles.tipTitle}>가족과 함께 변화를 나눠보세요</Text><Text style={styles.tipText}>평소와 다른 점이 걱정된다면 어르신과 이야기를 나누고 전문가 상담을 권해 주세요.</Text></View></View></View>
}

function CareScreen({ done, toggleActivity }) {
  return <View style={styles.sections}><View style={styles.secondaryIntro}><View><Label>매일의 작은 즐거움</Label><Heading>인지 웰니스 활동</Heading><Text style={styles.bodyCopy}>부담 없이 즐거운 활동을 하루에 더해 보세요.</Text></View></View>{activities.map((item) => { const completed = done.includes(item.id); return <Card key={item.id} style={styles.wellnessCard}><View style={styles.wellnessHeader}><View style={[styles.activityIcon, { backgroundColor: item.color }]}><Text style={{ color: item.ink, fontSize: 19 }}>{item.icon}</Text></View><Text style={styles.activityDuration}>{item.duration}</Text></View><Heading style={styles.wellnessTitle}>{item.title}</Heading><Text style={styles.bodyCopy}>{item.detail}</Text><Pressable onPress={() => toggleActivity(item.id)} style={[styles.wellnessButton, completed && styles.wellnessButtonDone]}><Text style={[styles.wellnessButtonText, completed && styles.wellnessButtonTextDone]}>{completed ? '완료했어요 ✓' : '활동 완료하기 →'}</Text></Pressable></Card>})}<View style={styles.tipCard}><Text style={styles.tipMark}>✳</Text><View style={{ flex: 1 }}><Text style={styles.tipTitle}>즐거운 대화와 움직임이 좋은 시작이에요</Text><Text style={styles.tipText}>산책, 충분한 수면, 사람들과의 대화를 이어가 보세요. 몸 상태에 맞춰 무리하지 않는 것이 중요해요.</Text></View></View></View>
}

function PlacesScreen({ region, setRegion, searched, setSearched }) {
  return <View style={styles.sections}><View style={styles.secondaryIntro}><View><Label>필요할 때 가까운 도움을</Label><Heading>주변 치매안심센터</Heading><Text style={styles.bodyCopy}>상담과 조기 검진 안내, 가족 지원 프로그램을 받을 수 있어요.</Text></View></View><Card><Text style={styles.inputLabel}>지역을 입력해 주세요</Text><View style={styles.searchRow}><TextInput accessibilityLabel="지역 입력" value={region} onChangeText={setRegion} placeholder="예: 서울시 종로구" placeholderTextColor={COLORS.soft} style={styles.searchInput} returnKeyType="search" onSubmitEditing={() => setSearched(true)} /><Pressable onPress={() => setSearched(true)} style={styles.searchButton}><Text style={styles.searchButtonText}>찾기</Text></Pressable></View><Text style={styles.searchNote}>{searched && region ? `‘${region}’ 검색은 실제 위치 서비스 연동 후 이용할 수 있어요.` : '지역 검색은 서비스 연동 후 이용할 수 있어요.'}</Text></Card><Text style={styles.placeSectionTitle}>도움받을 수 있는 곳</Text><PlaceCard icon="✳" title="지역 치매안심센터" type="상담 · 검진 안내" details="인지 선별검사, 상담, 가족 지원 프로그램" /><PlaceCard icon="＋" title="관할 보건소" type="건강 상담" details="지역 인지 건강 서비스 및 연계 안내" /><Text style={styles.placesDisclaimer}>시연 화면에는 실시간 위치 검색이 연결되어 있지 않아요. 정확한 기관 정보는 중앙치매센터 또는 관할 보건소에서 확인해 주세요.</Text></View>
}

function PlaceCard({ icon, title, type, details }) {
  return <Card style={styles.placeCard}><View style={styles.placeSymbol}><Text style={styles.placeSymbolText}>{icon}</Text></View><View style={{ flex: 1 }}><Text style={styles.placeType}>{type}</Text><Heading style={styles.placeTitle}>{title}</Heading><Text style={styles.placeDetail}>{details}</Text><Text style={styles.placeFine}>가까운 기관 위치와 운영 시간은 관할 기관에서 확인해 주세요.</Text></View><Text style={styles.centerArrow}>↗</Text></Card>
}

const COLORS = {
  canvas: '#f5f7f5',
  ink: '#30443d',
  muted: '#95a19a',
  green: '#5e987a',
  pale: '#edf6f1',
  line: '#edf0ed',
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.canvas },
  app: { flex: 1, backgroundColor: COLORS.canvas },
  topbar: { height: 59, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#e9ede9' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandMark: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6fac91' },
  brandHeart: { color: '#fff', fontSize: 21, fontWeight: '600' },
  brand: { color: COLORS.ink, fontSize: 17, fontWeight: '700', letterSpacing: -0.7 },
  brandCaption: { marginTop: 1, color: '#9eaaa3', fontSize: 8, letterSpacing: 1.1 },
  bellButton: { width: 33, height: 33, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f7f5' },
  bell: { color: '#77867e', fontSize: 17 },
  bellDot: { position: 'absolute', top: 7, right: 7, width: 6, height: 6, borderRadius: 3, backgroundColor: '#e9a277' },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 17, paddingTop: 23, paddingBottom: 20, gap: 15 },
  greeting: { gap: 6, marginBottom: 2 },
  eyebrow: { color: '#779687', fontSize: 10, fontWeight: '600' },
  heading: { color: COLORS.ink, fontSize: 14, lineHeight: 20, fontWeight: '600', letterSpacing: -0.3 },
  greetingTitle: { marginTop: 1, fontSize: 24, lineHeight: 31, letterSpacing: -0.9 },
  greenDot: { color: '#7ab193' },
  greetingSub: { color: COLORS.muted, fontSize: 10 },
  banner: { flexDirection: 'row', alignItems: 'center', gap: 11, padding: 12, minHeight: 67, borderWidth: 1, borderColor: '#e1efe6', borderRadius: 13, backgroundColor: '#f0f7f2' },
  bannerIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e1f0e7' },
  bannerHeart: { color: '#5a997c', fontSize: 17 },
  bannerCopy: { flex: 1, gap: 4 },
  bannerTitle: { color: '#466c59', fontSize: 10, fontWeight: '600' },
  bannerText: { color: '#819b8b', fontSize: 8, lineHeight: 13 },
  sections: { gap: 13 },
  card: { padding: 16, borderWidth: 1, borderColor: COLORS.line, borderRadius: 14, backgroundColor: '#fff' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  label: { color: '#9aa8a0', fontSize: 9, fontWeight: '600', letterSpacing: 0.2 },
  helpButton: { width: 19, height: 19, borderWidth: 1, borderColor: '#e6ebe7', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  helpText: { color: '#9aa69f', fontSize: 10 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 17, paddingHorizontal: 5, paddingVertical: 17 },
  statusRing: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e4f0e8', borderWidth: 6, borderColor: '#81bea0' },
  statusRingInner: { width: 86, height: 86, borderRadius: 43, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  ringCaption: { color: '#a1ada5', fontSize: 8 },
  ringValue: { marginTop: 1, color: '#558e71', fontSize: 19, fontWeight: '600' },
  ringSub: { color: '#9eaaa3', fontSize: 8 },
  statusCopy: { flex: 1, gap: 8 },
  statusPill: { alignSelf: 'flex-start', overflow: 'hidden', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 12, color: '#54856e', backgroundColor: '#eff7f1', fontSize: 8, fontWeight: '600' },
  bodyCopy: { marginTop: 7, color: '#87948d', fontSize: 10, lineHeight: 16 },
  actionLink: { alignSelf: 'flex-start', paddingVertical: 4 },
  actionLinkText: { color: '#56886e', fontSize: 9, fontWeight: '600' },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#edf0ed' },
  privacyLine: { marginTop: 10, color: '#9ba69f', fontSize: 8 },
  segmented: { alignSelf: 'flex-start', flexDirection: 'row', padding: 3, borderRadius: 8, backgroundColor: '#f2f5f2' },
  segment: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  segmentSelected: { backgroundColor: '#fff' },
  segmentText: { color: '#9ba49f', fontSize: 8 },
  segmentTextSelected: { color: '#52866d', fontWeight: '600' },
  chartSummary: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 15 },
  chartSummaryStrong: { color: '#5a8e72', fontSize: 10, fontWeight: '600' },
  chartSummaryNote: { color: '#a0aaa4', fontSize: 8 },
  chart: { height: 115, flexDirection: 'row', gap: 10, marginTop: 9 },
  chartLabels: { height: 83, justifyContent: 'space-between' },
  axisText: { color: '#adb7b0', fontSize: 7 },
  chartPlot: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  chartColumn: { flex: 1, alignItems: 'center', gap: 5 },
  chartTrack: { width: 11, height: 83, justifyContent: 'flex-end', overflow: 'hidden', borderRadius: 7, backgroundColor: '#f1f5f1' },
  chartBar: { width: '100%', borderRadius: 7, backgroundColor: '#8bc1a2' },
  chartAxis: { color: '#a9b2ac', fontSize: 7 },
  countBadge: { color: '#70947f', fontSize: 10 },
  callRow: { minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: 9, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#f0f2f0' },
  noBorder: { borderBottomWidth: 0 },
  callIcon: { width: 31, height: 31, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  callIconText: { color: '#69977a', fontSize: 14 },
  callInfo: { flex: 1, gap: 4 },
  callName: { color: '#4b5c53', fontSize: 9, fontWeight: '600' },
  callDetail: { color: '#a0aaa4', fontSize: 8 },
  callWhen: { alignItems: 'flex-end', gap: 4 },
  callTime: { color: '#89968e', fontSize: 8 },
  callLength: { color: '#a0aaa4', fontSize: 8 },
  activityRow: { minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#f0f2f0' },
  activityIcon: { width: 30, height: 30, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  activityCopy: { flex: 1, gap: 4 },
  activityTitle: { color: '#52635a', fontSize: 9, fontWeight: '600' },
  activityDetail: { color: '#a1aaa5', fontSize: 8 },
  activityDuration: { color: '#a1aaa5', fontSize: 8 },
  checkButton: { width: 19, height: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#dce5de', borderRadius: 10, backgroundColor: '#fff' },
  checkButtonDone: { borderColor: '#79ad8f', backgroundColor: '#79ad8f' },
  checkMark: { color: '#fff', fontSize: 10 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 11 },
  progressText: { color: '#9aa69e', fontSize: 8 },
  progressCount: { color: '#64866f', fontWeight: '600' },
  progressTrack: { width: 40, height: 4, overflow: 'hidden', borderRadius: 3, backgroundColor: '#eaf1eb' },
  progressFill: { height: '100%', borderRadius: 3, backgroundColor: '#7db393' },
  encouragement: { marginLeft: 'auto', color: '#94a79a', fontSize: 8 },
  centerCard: { minHeight: 63, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderWidth: 1, borderColor: '#f0e9dc', borderRadius: 12, backgroundColor: '#fcfaf6' },
  centerMark: { width: 31, height: 31, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#f6f0e5' },
  centerPin: { color: '#bd9d69', fontSize: 18 },
  centerCopy: { flex: 1, gap: 4 },
  centerTitle: { color: '#766747', fontSize: 9, fontWeight: '600' },
  centerSub: { color: '#a79a80', fontSize: 8 },
  centerArrow: { color: '#b29967', fontSize: 15 },
  secondaryIntro: { paddingVertical: 4 },
  metricGrid: { gap: 9 },
  metricCard: { minHeight: 77, justifyContent: 'center', gap: 4 },
  metricValue: { color: '#40594a', fontSize: 17, fontWeight: '600' },
  metricNote: { color: '#a2aca6', fontSize: 8 },
  largeChart: { height: 160, flexDirection: 'row', justifyContent: 'space-around', marginTop: 18 },
  largeChartColumn: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 7 },
  largeChartTrack: { width: 19, height: 125, justifyContent: 'flex-end', overflow: 'hidden', borderRadius: 10, backgroundColor: '#f1f5f1' },
  reportDisclaimer: { marginTop: 14, paddingTop: 12, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#edf0ed', color: '#9ca79f', fontSize: 9, lineHeight: 15 },
  tipCard: { flexDirection: 'row', alignItems: 'center', gap: 11, padding: 15, borderWidth: 1, borderColor: '#f0e9dc', borderRadius: 13, backgroundColor: '#fcfaf6' },
  tipMark: { color: '#7da58a', fontSize: 21 },
  tipTitle: { color: '#62786a', fontSize: 10, fontWeight: '600' },
  tipText: { marginTop: 4, color: '#8d9e90', fontSize: 8, lineHeight: 14 },
  wellnessCard: { gap: 8 },
  wellnessHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  wellnessTitle: { marginTop: 2 },
  wellnessButton: { alignSelf: 'flex-start', marginTop: 3, paddingVertical: 7 },
  wellnessButtonDone: { opacity: 0.65 },
  wellnessButtonText: { color: '#5f9073', fontSize: 9, fontWeight: '600' },
  wellnessButtonTextDone: { color: '#81968a' },
  inputLabel: { marginBottom: 8, color: '#64766a', fontSize: 9, fontWeight: '600' },
  searchRow: { flexDirection: 'row', gap: 8 },
  searchInput: { flex: 1, height: 39, paddingHorizontal: 11, borderWidth: 1, borderColor: '#e6ebe7', borderRadius: 8, backgroundColor: '#fbfcfb', color: '#4c5d53', fontSize: 10 },
  searchButton: { minWidth: 56, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 11, borderRadius: 8, backgroundColor: '#6b9b7c' },
  searchButtonText: { color: '#fff', fontSize: 9, fontWeight: '600' },
  searchNote: { marginTop: 8, color: '#a5aea8', fontSize: 8 },
  placeSectionTitle: { color: '#4b5f52', fontSize: 10, fontWeight: '600' },
  placeCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 11 },
  placeSymbol: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#eef5ef' },
  placeSymbolText: { color: '#7da58a', fontSize: 17 },
  placeType: { color: '#92a296', fontSize: 8 },
  placeTitle: { marginTop: 3, fontSize: 11 },
  placeDetail: { marginTop: 4, color: '#818e85', fontSize: 8 },
  placeFine: { marginTop: 6, color: '#a6afa8', fontSize: 7, lineHeight: 12 },
  placesDisclaimer: { color: '#a4ada6', fontSize: 8, lineHeight: 14 },
  pageNote: { alignItems: 'flex-start', paddingVertical: 3 },
  pageNoteText: { color: '#a8b0aa', fontSize: 8, lineHeight: 13 },
  tabBar: { minHeight: 61, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 8, paddingBottom: 5, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#e9ede9', backgroundColor: '#fff' },
  tabItem: { width: '25%', alignItems: 'center', gap: 3 },
  tabIcon: { color: '#96a19a', fontSize: 17 },
  tabIconActive: { color: '#579276' },
  tabLabel: { color: '#96a19a', fontSize: 8 },
  tabLabelActive: { color: '#579276', fontWeight: '600' },
  modalBackdrop: { flex: 1, justifyContent: 'center', paddingHorizontal: 21, backgroundColor: '#26362e77' },
  dialog: { padding: 23, borderRadius: 20, backgroundColor: '#fff' },
  dialogMark: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', marginBottom: 17, borderRadius: 14, backgroundColor: '#edf6f0' },
  dialogHeart: { color: '#5f9a7c', fontSize: 20 },
  dialogTitle: { marginTop: 7, fontSize: 19, lineHeight: 27 },
  dialogCopy: { marginTop: 10, color: '#87948d', fontSize: 10, lineHeight: 17 },
  dialogTip: { gap: 5, marginTop: 15, padding: 12, borderRadius: 11, backgroundColor: '#f7f8f4' },
  dialogTipTitle: { color: '#62786a', fontSize: 9, fontWeight: '600' },
  dialogTipText: { color: '#7d8c83', fontSize: 8, lineHeight: 13 },
  primaryButton: { height: 40, alignItems: 'center', justifyContent: 'center', marginTop: 16, borderRadius: 10, backgroundColor: '#63977a' },
  primaryButtonText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  tagRow: { flexDirection: 'row', gap: 6, marginTop: 12 },
  tag: { paddingHorizontal: 8, paddingVertical: 5, borderRadius: 7, color: '#668771', backgroundColor: '#f0f6f0', fontSize: 8 },
})
