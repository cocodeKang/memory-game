// 카드 목록 (이모지 사용)
const cardsArray = ["🐶", "🐶", "🐱", "🐱", "🐰", "🐰", "🐼", "🐼",
                    "🦊", "🦊", "🐻", "🐻", "🐯", "🐯", "🐷", "🐷"];

// 카드를 랜덤하게 섞기
let shuffledCards = cardsArray.sort(() => Math.random() - 0.5);

// 선택한 카드 저장용 배열
let selectedCards = [];
let matchedCards = [];

const gameBoard = document.getElementById("gameBoard");

// 카드 생성 및 화면 추가
shuffledCards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;  // 카드의 번호 저장
    card.dataset.emoji = emoji;  // 카드의 이모지 저장
    card.innerHTML = "❓";  // 기본 상태(뒷면)
    card.addEventListener("click", handleCardClick);
    card.addEventListener("touchstart", handleCardClick);  // 태블릿, 모바일 지원
    gameBoard.appendChild(card);
});

// 카드 클릭 이벤트
function handleCardClick(event) {
    const clickedCard = event.target;

    // 두 개 이상의 카드가 선택되었거나 이미 뒤집힌 카드라면 동작하지 않음
    if (selectedCards.length >= 2 || clickedCard.classList.contains("flipped")) {
        return;
    }

    clickedCard.innerHTML = clickedCard.dataset.emoji; // 앞면 보이기
    clickedCard.classList.add("flipped");
    selectedCards.push(clickedCard);

    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

// 카드 일치 확인
function checkMatch() {
    if (selectedCards[0].dataset.emoji === selectedCards[1].dataset.emoji) {
        matchedCards.push(...selectedCards);
        selectedCards = [];
        
        // 모든 카드 맞추면 게임 완료 메시지
        if (matchedCards.length === cardsArray.length) {
            setTimeout(() => alert("🎉 모든 카드를 맞췄어요!"), 500);
        }
    } else {
        // 카드가 다르면 다시 뒤집기
        selectedCards.forEach(card => {
            card.innerHTML = "❓";
            card.classList.remove("flipped");
        });
        selectedCards = [];
    }
}
