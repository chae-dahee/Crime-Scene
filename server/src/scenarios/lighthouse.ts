import type { Scenario } from '../types';

export const lighthouse: Scenario = {
  title: '마지막 불빛',
  intro: [
    '폭풍이 이틀째 섬을 두드리는 남해의 작은 섬, 해무도.',
    '배편이 끊긴 밤, 40년 동안 한 번도 꺼진 적 없던 등대 불이 꺼졌다.',
    '다음 날 아침, 등대지기 강만석이 등대 계단 아래에서 숨진 채 발견되었다. 일지의 마지막 줄에는 이렇게 적혀 있었다.',
    '"오늘 밤은 불을 켜지 않는다. 그 배가 오지 않도록."',
    '본토에서 온 신참 해양경찰인 당신은 배편이 다시 열리기 전에 사건을 정리해야 한다.',
  ],
  start: 'tower',
  interrogation: 'islandRoom',

  clues: {
    torn_log: { name: '찢긴 등대 일지', icon: 'doc', desc: '마지막 장에 "오늘 밤은 불을 켜지 않는다. 그 배가 오지 않도록." 바로 앞 한 페이지가 찢겨 나갔다.' },
    lamp_valve: { name: '잠긴 연료 밸브', icon: 'lamp', desc: '램프 연료 밸브가 손으로 끝까지 잠겨 있다. 고장이 아니라 누군가 일부러 불을 껐다.' },
    broken_rail: { name: '부러진 난간', icon: 'foot', desc: '계단 꼭대기 난간이 부러져 있고 벽에 긁힌 자국이 있다. 두 사람이 엉켜 싸운 흔적이다.' },
    oil_spill: { name: '쏟아진 램프 기름', icon: 'can', desc: '램프실 아래 바닥에 기름이 쏟아져 있고, 그 위를 밟고 나간 장화 자국이 있다.' },
    camera: { name: '서준의 카메라', icon: 'camera', desc: '민박 침대 위의 카메라. 메모리 카드에 어젯밤 찍은 사진이 남아 있다.' },
    shadow_photo: { name: '두 그림자 사진', icon: 'photo', desc: '밤 11시 40분, 불 꺼진 등대 꼭대기에 사람 그림자 두 개가 찍혀 있다. 한 명은 체격이 다부지다.' },
    rope: { name: '낯선 밧줄', icon: 'rope', desc: '선착장 기둥에 감긴 파란 합성 밧줄. 섬 어선은 마 밧줄만 쓴다. 물때 하나 없는 새것이고, 바다 쪽 끝이 칼로 잘려 있다.' },
    fuel_can: { name: '외지 연료통', icon: 'can', desc: '방수포 아래 숨겨진 연료통 여섯 개. 섬에서 쓰지 않는 상표이고 겉에 외국어가 적혀 있다.' },
    binoculars: { name: '탁자 위 쌍안경', icon: 'lens', desc: '해녀 작업장 탁자의 쌍안경. 등대 앞 암초 쪽 바다에 초점이 맞춰져 있다.' },
    signal: { name: '해녀의 증언', icon: 'voice', desc: '"그날 밤 앞바다에서 불빛이 세 번씩 깜박였어. 만석 영감이 그 배를 지켜봐 달라고 부탁했지."' },
    dry_gear: { name: '말라 있는 물질 도구', icon: 'glove', desc: '물옷과 테왁, 망사리가 바싹 말라 있다. 어제는 아무도 물질을 나가지 않았다.' },
    lantern: { name: '바닥난 랜턴', icon: 'lamp', desc: '작업장 랜턴의 기름이 바닥나 있다. 누군가 밤새 이곳에 있었다.' },
    old_accident: { name: '30년 전 사고', icon: 'voice', desc: '30년 전 문정희의 남편이 탄 배가 등대 앞 암초에 걸렸다. 강만석의 신고가 늦었다는 소문이 돌았다.' },
    dock_witness: { name: '선착장 목격담', icon: 'voice', desc: '불이 꺼진 뒤 작은 보트가 선착장에 붙었다가, 문정희를 보고 밧줄을 끊고 달아났다.' },
    forbidden: { name: '반대당한 만남', icon: 'voice', desc: '강만석은 하늘과 서준의 만남을 반대했다.' },
    resort_plan: { name: '리조트 조감도', icon: 'doc', desc: '등대 자리에 호텔이 그려진 "해무도 리조트" 조감도. 투자 유치 기한은 이번 달 말이다.' },
    oily_boots: { name: '기름 묻은 장화', icon: 'shoe', desc: '이장 집 현관의 장화. 밑창에 등대 램프 기름이 묻어 있고, 밑창 무늬가 등대 바닥의 기름 장화 자국과 같다.' },
    torn_page: { name: '찢긴 일지 페이지', icon: 'doc', desc: '"덕배가 부른 배가 15일 밤 들어온다. 리조트 돈을 마련하려는 밀수선이다. 불이 꺼지면 암초 때문에 들어오지 못한다." 15일은 사건 당일이다.' },
  },

  locations: [
    {
      id: 'tower', name: '등대', art: 'tower',
      desc: '강만석이 쓰러져 있던 등대 안이다. 나선 계단이 램프실까지 이어지고, 바닥에서 기름 냄새가 진하게 난다.',
      spots: [
        { id: 'log', label: '등대 일지', x: 25, y: 67, medium: true, clue: 'torn_log', text: '책상 위에 등대 일지가 펼쳐져 있다. 마지막 장에 "오늘 밤은 불을 켜지 않는다. 그 배가 오지 않도록."이라고 적혀 있다. 바로 앞 한 페이지가 찢겨 나갔다.' },
        { id: 'lamp', label: '램프실', x: 52, y: 20, medium: true, clue: 'lamp_valve', text: '램프실의 연료 밸브가 끝까지 잠겨 있다. 고장 난 곳은 없다. 누군가 손으로 불을 껐다.' },
        { id: 'rail', label: '계단 난간', x: 80, y: 53, medium: true, clue: 'broken_rail', text: '계단 꼭대기 난간이 부러져 있다. 벽에는 손톱으로 긁은 듯한 자국이 있다. 누군가 위에서 엉켜 싸웠다.' },
        { id: 'oil', label: '바닥', x: 52, y: 88, medium: true, clue: 'oil_spill', text: '램프실 아래 바닥에 램프 기름이 쏟아져 있다. 기름을 밟고 나간 장화 자국이 문 쪽으로 이어진다.' },
      ],
    },
    {
      id: 'dock', name: '선착장', art: 'dock',
      desc: '섬의 하나뿐인 선착장이다. 파도가 방파제를 넘어온다.',
      spots: [
        { id: 'rope', label: '밧줄', x: 38, y: 85, medium: true, clue: 'rope', text: '기둥에 굵은 파란 합성 밧줄이 감겨 있다. 섬 어선은 모두 마 밧줄을 쓴다. 물때 하나 없는 새 밧줄이다. 바다 쪽 끝은 칼로 자른 듯 깨끗하다.' },
        { id: 'fuel', label: '방수포', x: 14, y: 72, medium: true, clue: 'fuel_can', text: '방수포 아래 연료통 여섯 개가 숨겨져 있다. 섬에서 쓰지 않는 상표이고 겉에 외국어가 적혀 있다.' },
        { id: 'boat', label: '어선', x: 61, y: 57, medium: true, text: '마을 어선이다. 폭풍에 대비해 단단히 묶여 있다.' },
      ],
    },
    {
      id: 'chief', name: '이장 집', art: 'chiefHouse',
      desc: '이장 오덕배의 집이다. 거실 벽에 커다란 액자가 걸려 있다.',
      spots: [
        { id: 'plan', label: '액자', x: 77, y: 29, medium: true, clue: 'resort_plan', text: '"해무도 리조트" 조감도다. 등대가 있던 자리에 호텔이 그려져 있다. 아래에 "투자 유치 기한: 이번 달 말"이라고 적혀 있다.' },
        { id: 'desk', label: '책상', x: 70, y: 72, medium: true, text: '마을 회의록이다. 등대 철거 안건에 반대한 사람은 강만석 한 명뿐이다.' },
        { id: 'boots', label: '장화', x: 92, y: 88, medium: true, clue: 'oily_boots', text: '현관에 장화가 놓여 있다. 밑창에 기름이 묻어 번들거린다. 냄새를 맡아 보니 등대 램프 기름이다. 밑창 무늬가 등대 바닥에 찍힌 장화 자국과 같다.' },
      ],
    },
    {
      id: 'workshop', name: '해녀 작업장', art: 'workshop',
      desc: '해녀들이 물질을 준비하는 작업장이다. 창 너머로 등대와 앞바다 암초가 보인다.',
      spots: [
        { id: 'window', label: '창문', x: 68, y: 35, medium: true, text: '창으로 등대와 그 앞 암초가 한눈에 보인다. 등대 불이 없으면 밤에는 암초가 보이지 않는다.' },
        { id: 'binoculars', label: '쌍안경', x: 26, y: 76, medium: true, clue: 'binoculars', text: '탁자 위에 쌍안경이 놓여 있다. 초점이 등대 앞 암초 쪽 바다에 맞춰져 있다.' },
        { id: 'lantern', label: '랜턴', x: 29, y: 18, medium: true, clue: 'lantern', text: '기둥에 걸린 랜턴이다. 기름이 바닥나 있다. 밤새 켜 두었던 모양이다.' },
        { id: 'gear', label: '물질 도구', x: 25, y: 44, medium: true, clue: 'dry_gear', text: '물옷과 테왁, 망사리가 바싹 말라 있다. 어제는 아무도 물질을 나가지 않았다.' },
      ],
    },
    {
      id: 'minbak', name: '민박', art: 'minbak',
      desc: '섬에 하나뿐인 민박이다. 사진작가 서준이 묵고 있다.',
      spots: [
        { id: 'camera', label: '카메라', x: 41, y: 43, medium: true, clue: 'camera', text: '삼각대 위에 카메라가 놓여 있다. 메모리 카드에 어젯밤 찍은 사진이 남아 있다. 주인에게 설명을 들어야겠다.' },
        { id: 'tripod', label: '삼각대', x: 42, y: 75, medium: true, text: '삼각대가 등대 쪽 창을 향해 서 있다. 밤새 등대를 찍으려 한 것 같다.' },
        { id: 'bag', label: '배낭', x: 15, y: 80, medium: true, text: '여벌 옷과 섬 지도뿐이다. 지도에 등대가 빨간 펜으로 표시돼 있다.' },
      ],
    },
  ],

  suspects: [
    {
      id: 'hanul', name: '강하늘', role: '등대지기의 손녀',
      portrait: { image: 'assets/scenario3/characters/hanul.png' },
      intro: '등대지기의 손녀다. 눈가가 붉게 부어 있다.',
      talk: '할아버지는 사고로 돌아가신 거예요. 계단이 가파르니까요. 저는 이 섬을 떠나고 싶었지만, 할아버지를 해친 적은 없어요.',
      reactions: {
        torn_log: { text: '…맞아요, 제가 찢었어요. 할아버지가 일부러 불을 껐다는 게 알려지면 할아버지가 나쁜 사람이 될 것 같았어요. 여기요, 읽어 보세요.', gives: 'torn_page' },
        lamp_valve: { text: '할아버지는 40년 동안 한 번도 불을 끈 적이 없어요. 그날은… 제가 말씀드리기 어려워요.' },
        resort_plan: { text: '이장님은 매일 찾아왔어요. 땅을 팔면 육지 대학 학비도 해결된다고요. 할아버지는 등대를 지킬 사람이 저밖에 없다고 하셨지만… 솔깃했던 건 사실이에요.' },
        broken_rail: { text: '그날 저녁 할아버지랑 크게 다퉜어요. 대학 얘기를 꺼냈는데 서준 씨 얘기까지 나와서…. 제가 나올 때까진 멀쩡했어요. 정말이에요.' },
        oil_spill: { text: '그 장화 자국이요? 제 건 아니에요. 저는 그날 운동화를 신었어요.' },
        shadow_photo: { text: '두 사람이요? 그럼 할아버지 혼자가 아니었다는 거죠? …저는 그 전에 나왔어요.' },
        camera: { text: '그 사람 카메라를 왜 저한테…. 서준 씨 얘기는 하고 싶지 않아요. 할아버지는 다시는 만나지 말라고 하셨지만요.', gives: 'forbidden', again: '…네, 좋아해요. 그게 죄예요? 할아버지는 끝까지 반대하셨어요.' },
      },
      fallback: '모르겠어요. 그냥 내버려 두세요.',
      pressed: '왜 자꾸 그걸 들이미세요? 제가 할아버지를 어떻게 했다고 생각하시는 거예요?',
      hints: [
        { clue: 'lamp_valve', text: '할아버지는 램프실을 아무도 못 만지게 하셨어요.' },
        { clue: 'camera', text: '민박에 묵는 사람이 그날 밤에도 사진을 찍었을 거예요. 늘 그랬으니까요.' },
      ],
    },
    {
      id: 'deokbae', name: '오덕배', role: '이장',
      portrait: { image: 'assets/scenario3/characters/deokbae.png' },
      intro: '섬의 이장이다. 사람 좋은 웃음을 짓지만 눈은 웃지 않는다.',
      talk: '만석이 형님이 연세가 있으니 계단에서 발을 헛디딘 거지요. 이장으로서 안타까울 따름이오.',
      reactions: {
        resort_plan: { text: '젊은 애들은 다 떠나는데 뭐라도 해야 할 것 아니오. 반대한 건 형님 하나였소. 그렇다고 사람을 해칠 리가 있나.' },
        oily_boots: { text: '그건… 우리 집 경운기 기름이오. 등대랑은 상관없소.', again: '경운기 기름이라 하지 않았소! …냄새까지 맡아 봤단 말이오?' },
        oil_spill: { text: '등대 바닥에 기름이야 늘 있지. 형님이 칠칠치 못해서.' },
        lamp_valve: { text: '밸브가 잠겨 있었다고? …형님이 직접 잠갔겠지. 난 그날 등대 근처에도 안 갔소.', again: '안 갔다니까! …그, 그 밸브가 뻑뻑해서 손으로는 잘 안 열린다는 것도 난 모르오.' },
        rope: { text: '외지 배가 폭풍을 피해 잠깐 묶었다 간 거겠지.' },
        fuel_can: { text: '그건 리조트 공사에 쓰려고 들여온 거요. 문제 있소?' },
        signal: { text: '불빛? 폭풍 속에 고깃배 하나가 헤맨 거겠지.' },
        binoculars: { text: '정희 그 양반, 30년 전 남편 잃고 형님을 평생 원망했소. 그 쌍안경으로 뭘 봤는지 물어보시오.', gives: 'old_accident' },
        camera: { text: '외지 사진쟁이가 손녀랑 붙어 다녀서 형님 속깨나 끓였지. 그 사진쟁이한테나 물어보시오.' },
        shadow_photo: { text: '그 시간엔 집에서 자고 있었소. 사진이 이렇게 흐린데 누군지 어떻게 아오.' },
        torn_log: { text: '"그 배"? …폭풍에 무슨 배가 온다고. 형님이 요즘 정신이 오락가락했소.', again: '배 얘기는 그만하시오! …그나저나 찢긴 장은 어디 있소? 누가 가져갔소?' },
        torn_page: { text: '…형님이 노망이 나서 헛소리를 쓴 거요. 밀수선이라니.' },
        dock_witness: { text: '보트? …폭풍에 누가 배를 띄운다고. 정희 그 노인네 헛것을 본 거요.' },
        forbidden: { text: '그 사진쟁이가 앙심을 품었을 법하지 않소?' },
      },
      fallback: '이장으로서 할 말은 다 했소.',
      pressed: '같은 걸 몇 번이나 내미는 거요. 지금 날 의심하는 거요?',
      hints: [
        { clue: 'binoculars', text: '정희 그 양반 작업장에 가 보시오. 밤마다 바다만 들여다본다오.' },
        { clue: 'camera', text: '외지 사진쟁이가 민박에서 밤새 뭘 찍었는지 보시오.' },
      ],
    },
    {
      id: 'jeonghui', name: '문정희', role: '해녀',
      portrait: { image: 'assets/scenario3/characters/jeonghui.png' },
      intro: '50년 동안 물질을 해 온 해녀다. 등대지기와 앙숙으로 소문났다.',
      talk: '만석 영감이랑은 평생 싸웠지. 그래도 죽으라고 빈 적은 없어. 어젯밤 일은 내가 떠들 게 아니야.',
      reactions: {
        fuel_can: { text: '그 통… 지난달에 그 배가 내려놓고 간 거야. 그날 해 질 녘에 만석 영감이 찾아와서 오늘 밤 그 배가 또 온다고, 지켜봐 달라더군. 밤에 앞바다에서 불빛이 세 번씩 깜박였어. 큰 배는 암초 앞에서 멈춰 섰지.', gives: 'signal' },
        binoculars: { text: '그래, 내 거야. 그날 밤 여기서 바다를 보고 있었어. 선착장에 뭐가 남았는지는 봤나?' },
        dry_gear: { text: '…폭풍에 물질은 무슨. 그래, 둘러댔어. 종일 여기 있었어. 해 질 녘에 만석 영감이 왔을 때도.', again: '말했잖아! 더 캐묻지 마.' },
        lantern: { text: '밤새 바다를 봤으니까. 영감이 부탁한 일이야. …더는 묻지 마.' },
        lamp_valve: { text: '불이 꺼지는 건 봤어. 누가 껐는지는… 영감 체면도 있고, 내가 말할 일이 아니야.' },
        broken_rail: { text: '불이 꺼지고 나서 걱정이 돼서 등대 아래까지 갔어. 위에서 고함 소리가 났어. 바람 소리인 줄 알았지. …올라가 보진 않았어.' },
        shadow_photo: { text: '다부진 체격이면 나라는 거야? 물질 50년이면 어깨가 이렇게 돼. …어두워서 누군지는 못 봤어.' },
        rope: { text: '섬 사람은 그런 밧줄 안 써. 외지 배야. …그 이상은 묻지 마.', again: '…그래, 선착장에 있었어! 불 꺼지고 작은 보트 하나가 붙더니, 날 보고는 밧줄을 끊고 달아났어. 이제 됐어?', againGives: 'dock_witness' },
        torn_log: { text: '그 영감, 일지 하나는 꼬박꼬박 썼지.' },
        old_accident: { text: '…그 얘길 누가 했어? 덕배지? 그래, 평생 원망했어. 그렇다고 죽이진 않아!' },
      },
      fallback: '그런 건 몰라.',
      pressed: '또 그거야? 내가 만석 영감을 밀었다고 보는 거지?',
      hints: [
        { clue: 'rope', text: '선착장 기둥이나 한번 봐. 섬 물건이 아닌 게 묶여 있더라.' },
        { clue: 'fuel_can', text: '선착장 방수포 밑은 아무도 안 들춰 보더라.' },
      ],
    },
    {
      id: 'seojun', name: '서준', role: '사진작가',
      portrait: { image: 'assets/scenario3/characters/seojun.png' },
      intro: '폭풍 사진을 찍으러 온 외지 사진작가다. 카메라 가방을 끌어안고 있다.',
      talk: '사흘 전에 등대에 몰래 들어간 건 사과드릴게요. 하지만 어젯밤에는 민박 창문에서 사진만 찍었어요.',
      reactions: {
        camera: { text: '…보여 드릴게요. 11시 40분쯤 불이 꺼지고 나서 찍은 거예요. 꼭대기에 사람이 둘 있었어요. 처음엔 그중 하나가 하늘 씨일까 봐 말을 못 했어요.', gives: 'shadow_photo' },
        shadow_photo: { text: '저는 그 시간에 민박에 있었어요. 이 사진이 증거예요.', again: '…잡지사에서 연락이 오긴 했어요. 그래도 안 팔았어요.' },
        broken_rail: { text: '그 난간… 사흘 전에 하늘 씨가 등대를 구경시켜 줬다가 할아버지께 들켰어요. 끌려 나가면서 붙잡았던 데예요. 그땐 부러지지 않았어요. 다시는 하늘 씨를 만나지 말라고 하셨죠.' },
        lamp_valve: { text: '제가 들어갔을 때는 불이 잘 켜져 있었어요. 밸브에는 손도 안 댔어요.' },
        torn_log: { text: '일지는 본 적 없어요. …설마 하늘 씨가 뭘 숨긴 건 아니죠?' },
        forbidden: { text: '…맞아요. 그래서 그날 밤 꼭대기 그림자가 하늘 씨일까 봐 겁났어요.' },
      },
      fallback: '그건 잘 모르겠어요.',
      pressed: '그건 아까 말씀드렸잖아요. 외지 사람이라서 저부터 의심하시는 거예요?',
      hints: [
        { clue: 'resort_plan', text: '이장님 댁 액자에 이 섬 그림이 걸려 있던데요. 등대 자리에 다른 건물이 그려져 있었어요.' },
        { clue: 'oil_spill', text: '사흘 전 등대에 들어갔을 때는 바닥이 깨끗했어요. 지금은 어떤지 모르겠지만요.' },
      ],
    },
  ],

  accusation: {
    code: 'HAEMUDO · CASE 03',
    intro: '강만석의 죽음에 대한 결론을 기록하세요. 범인과 불을 끈 사람, 동기를 모두 특정해야 합니다.',
    questions: [
      { key: 'culprit', label: '범인', options: [
        { id: 'hanul', label: '강하늘' }, { id: 'deokbae', label: '오덕배' }, { id: 'jeonghui', label: '문정희' }, { id: 'seojun', label: '서준' },
      ] },
      { key: 'lights', label: '불을 끈 사람', options: [
        { id: 'mansuk', label: '강만석' }, { id: 'hanul', label: '강하늘' }, { id: 'deokbae', label: '오덕배' }, { id: 'jeonghui', label: '문정희' }, { id: 'seojun', label: '서준' },
      ] },
      { key: 'motive', label: '동기', options: [
        { id: 'leave', label: '섬을 떠나려고' }, { id: 'smuggle', label: '밀수선을 섬에 들이려고' }, { id: 'grudge', label: '남편을 잃은 원한 때문에' }, { id: 'romance', label: '사랑을 지키려고' },
      ] },
    ],
    answer: { culprit: 'deokbae', lights: 'mansuk', motive: 'smuggle' },
  },

  endings: {
    success: [
      '오덕배는 한참 동안 장화를 내려다보다가 입을 열었다.',
      '그 밤 섬으로 들어오려던 배는 리조트 자금을 마련하려고 오덕배가 불러들인 밀수선이었다. 등대 불이 꺼지면 배는 암초 때문에 섬에 다가올 수 없었다.',
      '큰 배 대신 작은 보트 하나가 선착장에 닿았지만, 그곳을 지키던 문정희를 보고 밧줄을 끊고 달아났다.',
      '불을 끈 사람은 강만석 자신이었다. 오덕배는 불을 다시 켜려고 등대에 올라갔고, 몸싸움 끝에 그를 계단 아래로 밀었다. 겁에 질린 그는 불을 다시 켜지 못한 채 등대를 빠져나왔다.',
      '배편이 다시 열린 저녁, 해무도 등대에 다시 불이 들어왔다.',
    ],
    fail: [
      '폭풍이 지나가자 사건은 사고로 정리되었다.',
      '등대지기는 계단에서 발을 헛디딘 노인으로 기록되었다.',
      '얼마 뒤 해무도 앞바다에 정체 모를 배가 다시 나타났다.',
    ],
  },

  adHints: [
    { clue: 'torn_log', text: '등대 책상 위의 일지를 살펴봐야겠다.' },
    { clue: 'torn_page', needs: 'torn_log', text: '찢긴 등대 일지를 강하늘에게 보여 줘야겠다.' },
    { clue: 'lamp_valve', text: '등대의 램프실을 살펴봐야겠다.' },
    { clue: 'camera', text: '민박의 카메라를 살펴봐야겠다.' },
    { clue: 'shadow_photo', needs: 'camera', text: '서준의 카메라를 서준에게 보여 줘야겠다.' },
    { clue: 'oil_spill', text: '등대 바닥을 살펴봐야겠다.' },
    { clue: 'oily_boots', text: '이장 집 현관의 장화를 살펴봐야겠다.' },
    { clue: 'resort_plan', text: '이장 집 거실의 액자를 살펴봐야겠다.' },
  ],
};
