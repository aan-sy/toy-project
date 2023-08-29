# 당근 모으기 게임

Play here : https://leesoyeonnn.github.io/carrot-game/

## 프로젝트 설명
HTML, CSS, JavaScript로 만든 웹/모바일 브라우저에서 플레이 할 수 있는 간단한 게임입니다.

Dream Coding의 ‘브라우저 101’ 강의를 통해 만들게 되었습니다.

강의 내용 외에 아이템 움직이기, 일시 정지, 당근 재배치, 목숨, 소리 on/off, 레벨, 점수 기능을 추가해 보았습니다.

프로젝트를 통해 게임 만들기를 넘어 Class 문법으로 자바스크립트 코드를 모듈화 하는 방법을 배우게 되었습니다.

## 게임 기능
- 게임이 시작되면 당근과 토끼가 랜덤 배치되고, 타이머가 동작 되어요.
- 당근을 클릭하면 당근을 모을 수 있어요. 더 빠르게 모을수록 점수가 올라가요.
- 토끼를 클릭하면 목숨과 점수가 줄어들어요.
- 일시 정지 버튼을 클릭해 당근과 토끼를 재배치 하거나, 게임을 마저 이어갈 수 있어요.
- 목숨이 모두 깎이거나, 제한 시간 안에 당근을 모두 모으지 못하면 게임은 종료되어요.
- 레벨이 높아질수록 당근의 개수가 많아져요.
- 오디오 제어 버튼을 눌러 게임 소리를 켜거나, 음소거 시킬 수 있어요.
- 마지막 레벨까지 당근 모으기를 완료하면 점수를 확인할 수 있어요.

### Game Custom
main.js 파일에서 게임을 생성할 때 주요한 정보를 쉽게 수정할 수 있습니다.
- pc, mobile 별로 아이템의 개수나 크기 조절
- ItemBuilder 모듈을 이용해 원하는 이미지의 아이템 만들기
- GameBuilder 모듈을 이용해 게임 시간, 목숨 개수, 최대 레벨 조절

### Game GIF

pc

<img width="50%" alt="game preview" src="https://github.com/leesoyeonnn/carrot-game/assets/52520202/23b9f289-a8d3-4e31-b5bc-555cb9d44bf8" />

mobile

<img width="50%" alt="game preview" src="https://github.com/leesoyeonnn/carrot-game/assets/52520202/d0549995-1c98-4cc6-b4d1-7f8bb2e3a6a5" />

## 리소스 출처
- 오디오 : 강의에서 제공된 파일
- 토끼 : Ador - Newjeans
- 당근 케이크 : https://pixabay.com/ko/illustrations/당근-케이크-케이크-디저트-7032823/
- 당근 : https://www.canva.com/


