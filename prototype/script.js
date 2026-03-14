/* ===== 화면 전환 ===== */
const screens = {
home: 'screen-home',
explore: 'screen-explore',
mark: 'screen-mark',
detective: 'screen-detective',
profile: 'screen-profile',
notif: 'screen-notif'
};
let currentScreen = 'home';

function switchScreen(name) {
if (name === currentScreen) return;

// 맛 표현 화면 초기화
if (name === 'mark') resetMarking();

document.querySelectorAll('.screen').forEach(s => {
s.classList.remove('active', 'slide-left');
});
document.getElementById(screens[name]).classList.add('active');

// 네비게이션 활성 상태
document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
const navMap = { home: 0, explore: 1, detective: 3, profile: 4 };
if (navMap[name] !== undefined) {
document.querySelectorAll('.nav-item')[navMap[name]].classList.add('active');
}

currentScreen = name;
}

/* ===== 피드 탭 전환 ===== */
function switchFeedTab(el) {
el.parentElement.querySelectorAll('.feed-tab').forEach(t => t.classList.remove('active'));
el.classList.add('active');
}

/* ===== 필터 칩 토글 ===== */
function toggleChip(el) {
el.classList.toggle('active');
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
const searchVal = document.getElementById('exploreSearchInput').value.toLowerCase();
const activeChips = Array.from(document.querySelectorAll('.filter-chip.active:not(:first-child)'))
.map(c => c.textContent.replace(/[^\w\sㄱ-힣]/g, '').trim());

const allCards = document.querySelectorAll('.explore-card');

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
} else {
card.style.display = 'none';
}
});
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
document.getElementById('markingGuide').textContent = '📸 미식 포인트를 확인했어요!';
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
}

/* ===== 강도 슬라이더 ===== */
function updateIntensity(val) {
const fires = ['😐', '🔥', '🔥🔥', '🔥🔥🔥', '🔥🔥🔥🔥', '🤯🔥🔥🔥🔥🔥'];
document.getElementById('intensityVal').textContent = fires[val];
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

/* ===== 토스트 ===== */
function showToast(msg) {
const toast = document.getElementById('toast');
toast.textContent = msg;
toast.classList.add('show');
setTimeout(() => toast.classList.remove('show'), 2500);
}

