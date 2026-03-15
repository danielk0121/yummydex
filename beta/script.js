/* ===== 20대 미식 표준 지표 정의 ===== */
const TASTE_METRICS = {
    // 1. 기본 미각 (Basic Taste)
    sugar: { name: '단맛', icon: '🍯', category: 'basic', color: '#ffb347' },
    salt: { name: '짠맛', icon: '🧂', category: 'basic', color: '#4a6cf7' },
    sour: { name: '신맛', icon: '🍋', category: 'basic', color: '#ffd43b' },
    umami: { name: '감칠맛', icon: '🍄', category: 'basic', color: '#16a34a' },
    bitter: { name: '쓴맛', icon: '☕', category: 'basic', color: '#636366' },

    // 2. 물리적 감각 & 식감 (Texture)
    spicy: { name: '매운맛', icon: '🌶️', category: 'texture', color: '#ff4500' },
    crispy: { name: '바삭함', icon: '🔥', category: 'texture', color: '#e8930c' },
    chewy: { name: '쫄깃함', icon: '🦑', category: 'texture', color: '#ca8a04' },
    soft: { name: '부드러움', icon: '☁️', category: 'texture', color: '#0d9488' },
    thick: { name: '꾸덕함', icon: '🍯', category: 'texture', color: '#a855f7' },
    oily: { name: '기름짐', icon: '🥓', category: 'texture', color: '#ff6b35' },
    fresh: { name: '신선도', icon: '🌿', category: 'texture', color: '#22c55e' },

    // 3. 직관적 풍미/향 (Flavor)
    dairy: { name: '치즈/우유', icon: '🧀', category: 'flavor', color: '#fbbf24' },
    buttery: { name: '버터향', icon: '🧈', category: 'flavor', color: '#f59e0b' },
    smoky: { name: '불맛', icon: '🔥', category: 'flavor', color: '#44403c' },
    spiced: { name: '향신료', icon: '🌿', category: 'flavor', color: '#8b5cf6' },
    nutty: { name: '고소함', icon: '🥜', category: 'flavor', color: '#92400e' },
    meaty: { name: '육향', icon: '🥩', category: 'flavor', color: '#ef4444' },
    seafood: { name: '해물향', icon: '🌊', category: 'flavor', color: '#3b82f6' },
    fruity: { name: '과일/상큼', icon: '🍓', category: 'flavor', color: '#ec4899' }
};

const SAMPLE_FEEDS = [
    {
        id: 1,
        user: '미식가김',
        location: '연남동 샐러드 카페',
        time: '2시간 전',
        image: '../docs/sample/salad-01.jpg',
        comment: '아보카도와 드레싱의 조화가 너무 부드러워요. 채소는 좀 숨이 죽어 신선도가 아쉽지만, 드레싱 맛이 좋아서 계속 먹게 되네요. #가성비좋음 #연남동브런치',
        matchRate: 87,
        matchReason: "'부드러움'과 '감칠맛'을 중시하는 미식가님의 평소 취향과 87% 일치하는 데이터입니다.",
        authorTags: ['soft', 'umami', 'nutty', 'sour'],
        aiScores: { soft: 482, umami: 378, fresh: 256, nutty: 155 },
        aiSampleCount: 1240,
        officialSpectrum: ['#부드러움_끝판왕', '#아보카도_풍미', '#건강한_감칠맛'],
        comments: [
            { user: '건강러', text: '여기 아보카도 진짜 잘 익었네요! 드레싱 어떤 거 쓰나요?', time: '1시간 전' },
            { user: '샐러드매니아', text: '채소 신선도가 여기까지 느껴져요. 연남동 가면 꼭 가볼게요!', time: '45분 전' }
        ]
    },
    {
        id: 2,
        user: '단짠러버',
        location: '이태원 버거 하우스',
        time: '5시간 전',
        image: '../docs/sample/burger-01.jpg',
        comment: '패티의 육즙과 녹아내린 치즈의 밸런스가 환상적이에요. 번도 구워져서 고소함이 두 배! #이태원맛집 #헤비함주의',
        matchRate: 72,
        matchReason: "평소 '육향'과 '치즈향'을 선호하시지만, 이 메뉴의 '짠맛' 수치가 미식가님의 기준보다 높습니다.",
        authorTags: ['meaty', 'dairy', 'buttery', 'salt', 'thick'],
        aiScores: { meaty: 1892, dairy: 980, salt: 562, buttery: 675, oily: 1488 },
        aiSampleCount: 3580,
        officialSpectrum: ['#압도적_육즙', '#체다치즈_폭탄', '#미국식_헤비함'],
        comments: [
            { user: '버거덕후', text: '여기 패티 굽기 조절 가능한가요? 비주얼 대박이네요', time: '4시간 전' },
            { user: '육즙사랑', text: '한 입 베어물면 육즙 팡 터질 것 같아요... 츄릅', time: '3시간 전' }
        ]
    },
    {
        id: 3,
        user: '파스타덕후',
        location: '한남동 이탈리안 키친',
        time: '어제',
        image: '../docs/sample/pasta-01.jpg',
        comment: '면의 삶기가 완벽해요. 알덴테의 정석! #한남동맛집 #파스타전문점 #양은조금적음',
        matchRate: 58,
        matchReason: "미식가님은 '짠맛'에 민감하시지만, 이 유저는 '짠맛' 수치를 높게 평가하는 경향이 있습니다.",
        authorTags: ['salt', 'chewy', 'soft', 'seafood', 'umami'],
        aiScores: { chewy: 988, soft: 482, seafood: 380, salt: 365, umami: 272 },
        aiSampleCount: 2105,
        officialSpectrum: ['#정통_알덴테', '#짭짤한_바다내음', '#생면_식감'],
        comments: [
            { user: '와인러버', text: '여기 파스타 진짜 생면 쓰나요? 소스가 잘 배어있네요', time: '어제' }
        ]
    }
];

/* ===== 화면 전환 (파일 분리 버전) ===== */
const pages = {
    home: 'index.html',
    explore: 'explore.html',
    mark: 'mark.html',
    detective: 'detective.html',
    profile: 'profile.html'
};

function switchScreen(name) {
    if (pages[name]) {
        location.href = pages[name];
    }
}

// 현재 페이지에 따른 네비게이션 활성화 (DOMContentLoaded 시 실행)
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'index.html';
    
    const navMap = {
        'index.html': 0,
        'explore.html': 1,
        'mark.html': 2, 
        'detective.html': 3,
        'profile.html': 4
    };

    const navItems = document.querySelectorAll('.top-nav .nav-item');
    if (navItems.length > 0) {
        navItems.forEach(n => n.classList.remove('active'));
        const activeIdx = navMap[page];
        if (activeIdx !== undefined && navItems[activeIdx]) {
            navItems[activeIdx].classList.add('active');
        }
    }
});

/* ===== 피드 탭 전환 ===== */
function switchFeedTab(el) {
el.parentElement.querySelectorAll('.feed-tab').forEach(t => t.classList.remove('active'));
el.classList.add('active');
}

/* ===== 미식 데이터 토글 ===== */
function toggleMetrics(btn) {
    const list = btn.nextElementSibling;
    const isShowing = list.classList.toggle('show');
    btn.textContent = isShowing ? '미식 데이터 접기 ▲' : '전체 미식 데이터 비교 ▼';
}

/* ===== 필터 칩 토글 ===== */
function toggleChip(el) {
el.classList.toggle('active');
// '전체' 칩 처리
if (el.textContent.includes('전체')) {
if (el.classList.contains('active')) {
document.querySelectorAll('.filter-chip').forEach(c => {
if (!c.textContent.includes('전체')) c.classList.remove('active');
});
}
} else {
const allChip = document.querySelector('.filter-chip');
if (allChip.textContent.includes('전체')) allChip.classList.remove('active');
}
updateExploreFilter();
}

function resetFilters() {
// 검색어 초기화
const input = document.getElementById('exploreSearchInput');
if (input) input.value = '';
// 검색 태그 초기화
activeSearchTags.clear();
renderSearchTags();
// 필터 칩 초기화
document.querySelectorAll('.filter-chip').forEach(c => {
if (c.textContent.includes('전체')) c.classList.add('active');
else c.classList.remove('active');
});
// 필터링 적용
updateExploreFilter();
}

/* ===== 검색 기능 강화 (태그 추가 방식) ===== */
const activeSearchTags = new Set();

function handleSearchKeyUp(event) {
if (event.key === 'Enter') {
addSearchTag();
} else {
updateExploreFilter();
}
}

function addSearchTag() {
const input = document.getElementById('exploreSearchInput');
const val = input.value.trim();

if (val && !activeSearchTags.has(val)) {
activeSearchTags.add(val);
renderSearchTags();
input.value = '';
updateExploreFilter();
}
}

function removeSearchTag(val) {
activeSearchTags.delete(val);
renderSearchTags();
updateExploreFilter();
}

function renderSearchTags() {
const container = document.getElementById('activeSearchTags');
if (!container) return;
container.innerHTML = '';
activeSearchTags.forEach(tag => {
const tagEl = document.createElement('div');
tagEl.className = 'search-tag';
tagEl.innerHTML = `
<span>#${tag}</span>
<span class="remove-tag" onclick="removeSearchTag('${tag}')">✕</span>
`;
container.appendChild(tagEl);
});
}

function updateExploreFilter() {
const searchVal = document.getElementById('exploreSearchInput')?.value.toLowerCase();
const activeChips = Array.from(document.querySelectorAll('.filter-chip.active:not(:first-child)'))
.map(c => c.textContent.replace(/[^\w\sㄱ-힣]/g, '').trim());

const allCards = document.querySelectorAll('.explore-card');
let visibleCount = 0;

allCards.forEach(card => {
const title = card.querySelector('.card-title').textContent.toLowerCase();
const restaurant = card.querySelector('.card-restaurant')?.textContent.toLowerCase() || '';
const tags = Array.from(card.querySelectorAll('.mini-tag')).map(t => t.textContent.toLowerCase());

// 1. 직접 검색어 매칭
const matchSearch = !searchVal || title.includes(searchVal) || restaurant.includes(searchVal);

// 2. 해시태그(추가된 태그) 매칭 (모든 태그가 포함되어야 함)
const matchAddedTags = activeSearchTags.size === 0 || 
Array.from(activeSearchTags).every(t => 
title.includes(t.toLowerCase()) || 
restaurant.includes(t.toLowerCase()) ||
tags.some(tag => tag.includes(t.toLowerCase()))
);

// 3. 필터 칩 매칭
const matchChips = activeChips.length === 0 || 
activeChips.some(chip => tags.some(tag => tag.includes(chip.toLowerCase())));

if (matchSearch && matchAddedTags && matchChips) {
card.style.display = '';
visibleCount++;
} else {
card.style.display = 'none';
}
});

// 빈 상태 처리
const emptyState = document.getElementById('exploreEmptyState');
const grid = document.getElementById('exploreGrid');
if (emptyState && grid) {
    if (visibleCount === 0) {
        emptyState.style.display = 'block';
        grid.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        grid.style.display = 'grid';
    }
}
}

/* ===== 맛 표현 플로우 ===== */
let markingState = 'camera'; // camera → marking → taste → location
let markingMap = null;
let capturedLocation = null;
let feedMapInstance = null;

function resetMarking() {
markingState = 'camera';
capturedLocation = null;
document.getElementById('cameraMode').style.display = '';
document.getElementById('cameraControls').style.display = '';
document.getElementById('markingMode').classList.remove('show');
document.getElementById('tastePanel').classList.remove('show');
document.getElementById('locationPanel').classList.remove('show');
// 로딩 오버레이 초기화
const loadingEl = document.getElementById('mapLoadingOverlay');
if (loadingEl) loadingEl.style.display = 'flex';
const nameEl = document.getElementById('locationInfoName');
if (nameEl) nameEl.textContent = '위치를 불러오는 중...';
const coordsEl = document.getElementById('locationInfoCoords');
if (coordsEl) coordsEl.textContent = '';
// 지도 제거
if (markingMap) { markingMap.remove(); markingMap = null; }
updateSteps('step1');
}

function takePhoto() {
markingState = 'taste';
document.getElementById('cameraMode').style.display = 'none';
document.getElementById('cameraControls').style.display = 'none';
document.getElementById('markingMode').classList.add('show');
document.getElementById('tastePanel').classList.add('show');
updateSteps('step3');
}

function updateSteps(current) {
const steps = ['step1', 'step2', 'step3', 'step4'];
const idx = steps.indexOf(current);
steps.forEach((s, i) => {
const el = document.getElementById(s);
if (!el) return;
el.classList.remove('current', 'done');
if (i < idx) el.classList.add('done');
if (i === idx) el.classList.add('current');
});
}

/* ===== 맛 태그 선택 ===== */
function toggleTaste(el) {
el.classList.toggle('selected');
updateSelectedTagsPreview();
}

function updateSelectedTagsPreview() {
const preview = document.getElementById('selectedTagsPreview');
if (!preview) return;
const selected = document.querySelectorAll('.taste-option.selected');
if (selected.length === 0) {
    preview.innerHTML = '';
    return;
}
preview.innerHTML = '<div style="width:100%;font-size:11px;font-weight:700;color:#636366;margin-bottom:2px;">선택한 맛 표현 (' + selected.length + '개)</div>' +
    Array.from(selected).map(el => {
        const emoji = el.querySelector('.t-emoji').textContent;
        const name = el.textContent.replace(emoji, '').trim();
        return '<span class="preview-tag">' + emoji + ' ' + name + '</span>';
    }).join('');
}

/* ===== 업로드 완료 → 위치 기록 단계 ===== */
function completeUpload() {
markingState = 'location';
document.getElementById('tastePanel').classList.remove('show');
showLocationPanel();
}

/* ===== 위치 기록 패널 ===== */
function showLocationPanel() {
document.getElementById('locationPanel').classList.add('show');
updateSteps('step4');

// 이전 지도 제거
if (markingMap) { markingMap.remove(); markingMap = null; }

// 로딩 오버레이 표시
const loadingEl = document.getElementById('mapLoadingOverlay');
if (loadingEl) loadingEl.style.display = 'flex';
document.getElementById('locationInfoName').textContent = '위치를 불러오는 중...';
document.getElementById('locationInfoCoords').textContent = '';

if (!navigator.geolocation) {
// 위치 API 미지원 → 서울 기본 위치 사용
initMarkingMap(37.5665, 126.9780, '서울특별시 (기본 위치)');
return;
}

navigator.geolocation.getCurrentPosition(
(pos) => {
initMarkingMap(pos.coords.latitude, pos.coords.longitude, null);
},
() => {
// 권한 거부 또는 오류 → 을지로 데모 위치
initMarkingMap(37.5668, 126.9921, '을지로 (데모 위치)');
},
{ timeout: 8000, enableHighAccuracy: true }
);
}

function initMarkingMap(lat, lng, fallbackName) {
capturedLocation = { lat, lng };

// 지도 초기화
markingMap = L.map('markingMap', { zoomControl: true, attributionControl: false })
.setView([lat, lng], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 })
.addTo(markingMap);

// 커스텀 마커
const icon = L.divIcon({
html: '<div style="background:#ff6b35;width:28px;height:28px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 10px rgba(255,107,53,0.55);display:flex;align-items:center;justify-content:center;font-size:14px;">📍</div>',
iconSize: [28, 28],
iconAnchor: [14, 14],
className: ''
});
L.marker([lat, lng], { icon }).addTo(markingMap);

// 로딩 오버레이 숨기기
const loadingEl = document.getElementById('mapLoadingOverlay');
if (loadingEl) loadingEl.style.display = 'none';

// 좌표 표시
document.getElementById('locationInfoCoords').textContent =
`${lat.toFixed(5)}, ${lng.toFixed(5)}`;

if (fallbackName) {
document.getElementById('locationInfoName').textContent = fallbackName;
} else {
// Nominatim 역지오코딩 (OpenStreetMap, 무료)
fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=ko`,
{ headers: { 'Accept-Language': 'ko' } })
.then(r => r.json())
.then(data => {
const a = data.address || {};
const name = a.road || a.neighbourhood || a.suburb ||
a.city_district || a.city || '현재 위치';
document.getElementById('locationInfoName').textContent = name;
})
.catch(() => {
document.getElementById('locationInfoName').textContent = '현재 위치';
});
}

// 지도 크기 보정
setTimeout(() => markingMap && markingMap.invalidateSize(), 150);
}

function skipLocation() {
capturedLocation = null;
finishMarking(false);
}

function confirmLocation() {
finishMarking(true);
}

function finishMarking(withLocation) {
const msg = withLocation
? '✨ 기록 완료! 위치가 지도에 저장되었어요 📍'
: '✨ 기록 완료! 당신의 미식 도감에 추가되었어요';
showToast(msg);
setTimeout(() => switchScreen('home'), 1500);
}

/* ===== 피드 카드 위치 지도 모달 ===== */
function showFeedMap(name, lat, lng) {
const modal = document.getElementById('mapModal');
document.getElementById('mapModalTitle').textContent = `📍 ${name}`;
document.getElementById('mapModalAddress').textContent = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
modal.classList.add('show');

setTimeout(() => {
if (feedMapInstance) { feedMapInstance.remove(); feedMapInstance = null; }
feedMapInstance = L.map('feedMap', { zoomControl: false, attributionControl: false })
.setView([lat, lng], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 })
.addTo(feedMapInstance);

const icon = L.divIcon({
html: `<div style="background:#ff6b35;width:32px;height:32px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 10px rgba(255,107,53,0.55);display:flex;align-items:center;justify-content:center;font-size:16px;">🍽️</div>`,
iconSize: [32, 32],
iconAnchor: [16, 16],
className: ''
});
L.marker([lat, lng], { icon }).addTo(feedMapInstance);
feedMapInstance.invalidateSize();

// 역지오코딩으로 주소 표시
fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=ko`)
.then(r => r.json())
.then(data => {
const a = data.address || {};
const addr = [a.city_district || a.suburb, a.road]
.filter(Boolean).join(' ');
if (addr) document.getElementById('mapModalAddress').textContent = addr;
})
.catch(() => {});
}, 100);
}

function closeFeedMap(event) {
if (event && event.target !== document.getElementById('mapModal')) return;
document.getElementById('mapModal').classList.remove('show');
}

/* ===== 리액션 토글 (맛있어요 / 먹고싶다) ===== */
function toggleReaction(btn, baseCount) {
    const isReacted = btn.classList.toggle('reacted');
    const countEl = btn.querySelector('.r-count');
    const newCount = isReacted ? baseCount + 1 : baseCount;
    countEl.textContent = newCount.toLocaleString();
}

/* ===== 토스트 ===== */
function showToast(msg) {
const toast = document.getElementById('toast');
toast.textContent = msg;
toast.classList.add('show');
setTimeout(() => toast.classList.remove('show'), 2500);
}
