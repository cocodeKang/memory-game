// 8장의 고유 카드 이미지 URL
const images = [
    "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000101.png",
    "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000401.png",
    "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000601.png",
    "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001301.png",
    "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002401.png",
    "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003701.png",
    "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/011101.png",
    "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/015001.png"
];

// 16장의 카드 배열 생성 (각 이미지를 2장씩)
const cardsArray = [...images, ...images];

// 카드 섞기
const shuffledCards = cardsArray.sort(() => Math.random() - 0.5);

// 선택한 카드 저장용 배열
let selectedCards = [];
let matchedCards = [];

// 게임판 생성
const gameBoard = document.getElementById("gameBoard");

shuffledCards.forEach((image, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index; // 카드 고유 번호 저장
    card.dataset.image = image; // 카드 이미지 저장

    // 카드 클릭 이벤트 추가
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
});

// 카드 클릭 이벤트 핸들러
function handleCardClick(event) {
    const clickedCard = event.target;

    // 이미 두 개의 카드가 선택되었거나, 이미 뒤집힌 카드라면 동작하지 않음
    if (selectedCards.length >= 2 || clickedCard.classList.contains("flipped")) {
        return;
    }

    // 카드 뒤집기
    clickedCard.classList.add("flipped");
    clickedCard.style.backgroundImage = `url('${clickedCard.dataset.image}')`;
    selectedCards.push(clickedCard);

    // 두 개의 카드가 선택되었을 때 매칭 검사
    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

// 카드 매칭 검사
function checkMatch() {
    const [card1, card2] = selectedCards;

    if (card1.dataset.image === card2.dataset.image) {
        matchedCards.push(...selectedCards); // 맞춘 카드 저장
        selectedCards = [];

        // 모든 카드를 맞춘 경우
        if (matchedCards.length === cardsArray.length) {
            setTimeout(() => alert("🎉 모든 카드를 맞췄어요!"), 500);
        }
    } else {
        // 카드가 일치하지 않으면 다시 뒤집기
        selectedCards.forEach(card => {
            card.style.backgroundImage = "url('./card-back.png')"; // 뒷면 이미지로 복원
            card.classList.remove("flipped");
        });
        selectedCards = [];
    }
}
