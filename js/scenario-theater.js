window.SCENARIOS = window.SCENARIOS || {};

SCENARIOS.theater = {
  title: '커튼콜',
  intro: [
    '내일이면 팔려 나가는 소극장, 달빛극장.',
    '폐관 공연 「겨울 정원」의 마지막 막이 내리고 박수가 쏟아졌지만, 커튼콜에 극단 대표 남궁혁은 나오지 않았다.',
    '그는 분장실에서 숨진 채 발견되었다. 곁에는 금박이 벗겨진 트로피가 깨져 있었다.',
    '객석에 있던 형사인 당신은 지원 경찰이 오기 전에 극장에 남은 네 사람 중 범인을 가려내야 한다.',
  ],
  start: 'dressing',
  interrogation: 'theaterRoom',

  clues: {
    trophy: { name: '깨진 트로피', icon: 'trophy', desc: '연극 가면이 달린 트로피. 받침이 부서지고 겉의 금박이 벗겨져 바닥에 흩어져 있다. 흉기로 보인다.' },
    phone: { name: '대표의 휴대폰', icon: 'phone', desc: '마지막 통화는 9시 16분에 끝났다. 그 뒤로 걸려 온 전화는 모두 받지 않았다.' },
    script_memo: { name: '대본 여백 메모', icon: 'doc', desc: '대표의 대본 여백에 "세라 교체, 유진"이라고 적혀 있다.' },
    lantern: { name: '깨진 랜턴', icon: 'lamp', desc: '무대 옆에 떨어진 소품 랜턴. 유리가 깨져 있다. 2막에 차유진이 들고 나가는 소품이다.' },
    cue_sheet: { name: '큐시트 지연 메모', icon: 'doc', desc: '2막 빗소리 큐 옆에 "윤세라 등장 3분 지연"이라고 적혀 있다. 다른 줄은 모두 검은 펜인데, 이 메모만 빨간 펜으로 쓰고 동그라미까지 쳐 두었다.' },
    cue_log: { name: '조명 콘솔 기록', icon: 'doc', desc: '2막 빗소리 암전 큐는 원래 40초다. 기록에는 9시 21분에 시작한 큐가 3분 30초 동안 이어졌다고 남아 있다.' },
    gloves: { name: '금박 묻은 목장갑', icon: 'glove', desc: '조정실 책상 위에 놓인 목장갑. 손바닥에 트로피와 같은 금박 가루가 묻어 있다.' },
    contract: { name: '극장 매각 계약서 초안', icon: 'doc', desc: '내일 날짜가 적힌 달빛극장 매각 계약서. 매도인 서명란에 남궁혁의 이름이 있다. 단원들에게는 알리지 않았다.' },
    yujin_slap: { name: '유진의 증언', icon: 'voice', desc: '"인터미션에 세라 선배가 대표님 뺨을 때리는 걸 봤어요. 교체 얘기를 들은 것 같았어요."' },
    sera_counter: { name: '세라의 반격', icon: 'voice', desc: '세라는 뺨을 때린 것은 인정했다. 대신 2막 암전 때 차유진이 자기 자리에 없었다고 말했다.' },
    yujin_truth: { name: '유진의 고백', icon: 'voice', desc: '암전 때 랜턴을 떨어뜨려 무대 옆에 숨어 있었다. 그때 올려다본 조정실 창은 비어 있었고, 세라는 입구에서 큐를 기다리고 있었다.' },
    sera_taemin: { name: '세라의 지목', icon: 'voice', desc: '"저는 늦지 않았어요. 2막 중에 분장실 복도에 있었던 건 태민 씨예요."' },
    taemin_truth: { name: '태민의 증언', icon: 'voice', desc: '9시 15분에 빚 문제로 분장실에 갔을 때 대표는 살아 있었다. 그 직전 대표와 백승희가 "극장을 팔면 가만두지 않겠다"며 다투는 소리를 들었다.' },
  },

  locations: [
    {
      id: 'dressing', name: '분장실', art: 'theater',
      desc: '남궁혁이 쓰러져 있던 분장실이다. 거울 조명은 켜진 채이고, 의자 하나가 넘어져 있다.',
      spots: [
        { id: 'trophy', label: '트로피', x: 76, y: 82, medium: true, clue: 'trophy', text: '연극 가면이 달린 트로피가 바닥에 떨어져 있다. 받침이 부서졌고, 벗겨진 금박 가루가 주변에 흩어져 있다.' },
        { id: 'phone', label: '휴대폰', x: 80, y: 47, medium: true, clue: 'phone', text: '화장대 위 대표의 휴대폰이다. 마지막 통화는 9시 16분에 끝났다. 그 뒤로는 부재중 전화만 쌓여 있다.' },
        { id: 'script', label: '대본', x: 60, y: 72, medium: true, clue: 'script_memo', text: '바닥에 흩어진 대본이다. 대표의 글씨로 여백에 "세라 교체, 유진"이라고 적혀 있다.' },
        { id: 'chair', label: '넘어진 의자', x: 57, y: 60, medium: true, text: '의자가 뒤로 넘어져 있다. 대표는 누군가와 마주 앉아 있다가 일어선 것 같다.' },
      ],
    },
    {
      id: 'stage', name: '무대', art: 'stage',
      desc: '「겨울 정원」 세트가 그대로 남은 무대다. 객석은 비었고, 바닥에 꽃잎과 가짜 눈이 흩어져 있다.',
      spots: [
        { id: 'bench', label: '정원 벤치', x: 36, y: 54, medium: true, text: '2막의 주 무대인 정원 벤치다. 빗소리 암전 동안 배우들은 이 자리에서 다음 장면을 기다린다.' },
        { id: 'lantern', label: '무대 옆', x: 80, y: 61, medium: true, clue: 'lantern', text: '무대 옆 바닥에 소품 랜턴이 쓰러져 있다. 유리가 깨져 있다. 2막에 차유진이 들고 나가는 소품이다.' },
        { id: 'petals', label: '바닥', x: 55, y: 62, medium: true, text: '꽃잎과 가짜 눈이 흩어져 있다. 발자국이 어지럽게 찍혀 있어 누구 것인지 가릴 수 없다.' },
      ],
    },
    {
      id: 'backstage', name: '무대 뒤', art: 'backstage',
      desc: '의상과 세트 판이 늘어선 무대 뒤 통로다. 한쪽은 분장실로, 다른 쪽은 무대로 이어진다.',
      spots: [
        { id: 'door', label: '분장실 문', x: 13, y: 40, medium: true, text: '분장실로 이어지는 문이 열려 있다. 조정실에서 내려오는 계단도 이 통로와 이어진다.' },
        { id: 'footprints', label: '발자국', x: 52, y: 80, medium: true, text: '먼지 위에 발자국이 분장실 쪽으로 이어진다. 배우들의 무대 구두가 아니라 밑창이 두꺼운 작업화 자국이다.' },
        { id: 'entrance', label: '무대 입구', x: 90, y: 50, medium: true, text: '배우들이 큐를 기다리는 무대 입구다. 여기서 고개를 들면 객석 뒤 조정실 창이 그대로 보인다.' },
        { id: 'lamp', label: '소품 랜턴', x: 71, y: 75, medium: true, text: '바닥에 놓인 소품 랜턴이다. 이건 멀쩡하다. 2막에 쓰는 랜턴은 무대 옆에 있을 것이다.' },
      ],
    },
    {
      id: 'booth', name: '조정실', art: 'booth',
      desc: '객석 뒤 높은 곳의 조정실이다. 창 너머로 무대 전체가 내려다보인다.',
      spots: [
        { id: 'console', label: '조명 콘솔', x: 15, y: 47, medium: true, clue: 'cue_log', text: '콘솔에 오늘 공연의 큐 기록이 남아 있다. 2막 빗소리 암전은 원래 40초인데, 9시 21분에 시작한 큐가 3분 30초 동안 이어졌다.' },
        { id: 'cuesheet', label: '큐시트', x: 44, y: 62, medium: true, clue: 'cue_sheet', text: '큐시트 2막 빗소리 큐 옆에 "윤세라 등장 3분 지연"이라고 적혀 있다. 다른 줄은 모두 검은 펜인데, 이 메모만 빨간 펜이다.' },
        { id: 'gloves', label: '장갑', x: 70, y: 66, medium: true, clue: 'gloves', text: '책상 위에 목장갑 한 짝이 놓여 있다. 손바닥에 금박 가루가 묻어 반짝인다.' },
        { id: 'window', label: '창', x: 70, y: 22, medium: true, text: '창 너머로 무대가 한눈에 보인다. 무대 옆에서도 이 창 안이 보일 것이다.' },
      ],
    },
    {
      id: 'lobby', name: '로비', art: 'lobbyHall',
      desc: '관객이 빠져나간 로비다. 창밖으로 비가 내리고, 안내 데스크에 서류가 놓여 있다.',
      spots: [
        { id: 'poster', label: '포스터', x: 47, y: 30, medium: true, text: '역대 공연 포스터가 걸려 있다. 모두 남궁혁이 연출하고 백승희가 무대를 맡은 작품이다.' },
        { id: 'flowers', label: '꽃병', x: 29, y: 42, medium: true, text: '"20년 동안 고마웠습니다"라는 카드가 꽂힌 꽃병이다. 보낸 사람은 단골 관객 모임이다.' },
        { id: 'desk', label: '안내 데스크', x: 75, y: 80, medium: true, clue: 'contract', text: '안내 데스크 클립보드에 서류가 끼워져 있다. 내일 날짜가 적힌 극장 매각 계약서 초안이다. 매도인은 남궁혁이다.' },
      ],
    },
  ],

  suspects: [
    {
      id: 'sera', name: '윤세라', role: '주연 배우',
      portrait: { image: 'assets/scenario4/characters/sera.png' },
      intro: '「겨울 정원」의 주연이다. 무대 화장을 지우지 않은 채 팔짱을 끼고 있다.',
      talk: '이 극단에서 10년을 버텼어요. 대표님과 사이가 좋았다고는 못 해요. 그래도 저는 2막 내내 무대 입구에 있었어요. 태민 씨가 그때 분장실 복도를 서성이는 걸 봤고요.',
      reactions: {
        yujin_slap: { text: '…그래요, 때렸어요. 저를 빼고 유진이를 세운다잖아요. 그런데 유진이는 왜 그 얘기만 하죠? 2막 암전 때 걔는 자기 자리에 없었어요.', gives: 'sera_counter' },
        cue_sheet: { text: '3분 지연이요? 말도 안 돼요. 저는 큐 램프만 보고 있었어요. 늦은 적 없어요. 복도에 있었던 건 태민 씨라니까요.', gives: 'sera_taemin' },
        script_memo: { text: '교체요? 오늘이 마지막 공연인데, 다음 시즌 얘기를 왜 여기 적어 둔 거죠. …그래서 화가 났던 거예요.' },
        yujin_truth: { text: '거봐요. 저는 입구에 있었다고 했잖아요. …유진이가 그걸 이제야 말하네요.' },
        cue_log: { text: '암전이 길었던 건 저도 느꼈어요. 무대 위에서 3분은 영원 같거든요. 승희 선배가 실수하는 사람은 아닌데.' },
        lantern: { text: '유진이 소품이에요. 암전 끝나고 들고 나와야 했는데 빈손이더라고요.' },
        trophy: { text: '대표님이 처음 받은 상이에요. 늘 분장실 선반에 두셨죠. 무거워서 저는 들어 본 적도 없어요.' },
        phone: { text: '9시 16분이면 저는 무대 입구에서 다음 장면을 기다리고 있었어요.' },
        contract: { text: '극장을 판다고요? …그럼 다음 시즌이고 교체고, 다 무슨 의미였던 거예요.' },
      },
      fallback: '그게 저랑 무슨 상관이죠?',
      pressed: '같은 걸 또 보여 주시네요. 결국 저를 범인으로 몰고 싶은 거죠?',
    },
    {
      id: 'taemin', name: '고태민', role: '조연 배우',
      portrait: { image: 'assets/scenario4/characters/taemin.png' },
      intro: '극단의 오랜 조연이다. 손을 가만두지 못하고 계속 비빈다.',
      talk: '대표님한테 돈을 빌린 건 맞아요. 어머니 병원비였어요. 하지만 저는 아니에요. 승희 선배가 극장 매각 문제로 대표님을 협박했다는 얘기는 들었어요.',
      reactions: {
        sera_taemin: { text: '…네, 분장실에 갔어요. 9시 15분쯤이요. 빚을 조금만 미뤄 달라고 했죠. 그때 대표님은 멀쩡히 살아 계셨어요. 들어가기 직전에 승희 선배가 "극장을 팔면 가만두지 않겠다"고 소리치는 것도 들었어요.', gives: 'taemin_truth' },
        phone: { text: '9시 16분이요? 제가 나오고 바로 누군가와 통화하셨나 봐요. 저는 그 길로 무대 뒤로 돌아갔어요.' },
        contract: { text: '극장을 판다고요? 그럼 우린 다 어떻게 되는 거예요. …승희 선배는 알고 있었던 것 같아요.' },
        trophy: { text: '저는 그 트로피에 손댄 적도 없어요. 대표님이 그걸 얼마나 아끼셨는데요.' },
        script_memo: { text: '세라 씨가 그걸 봤으면 난리가 났겠네요. 인터미션에 분장실이 시끄럽긴 했어요.' },
        cue_log: { text: '그 암전 때 저는 무대 뒤에 있었어요. 너무 길어서 사고가 난 줄 알았어요.' },
        gloves: { text: '그건 스태프 장갑이에요. 배우들은 그런 거 안 껴요.' },
        cue_sheet: { text: '세라 씨가 늦었다고요? 제가 무대 뒤로 돌아왔을 때 세라 씨는 입구에 서 있었는데요.' },
      },
      fallback: '잘 모르겠어요.',
      pressed: '그건 이미 말씀드렸잖아요. 빚 때문에 저부터 의심하시는 거죠?',
    },
    {
      id: 'seunghee', name: '백승희', role: '무대감독',
      portrait: { image: 'assets/scenario4/characters/seunghee.png' },
      intro: '20년 동안 이 극장의 무대를 맡아 온 무대감독이다. 침착하게 큐시트를 넘기고 있다.',
      talk: '저는 공연 내내 조정실을 떠나지 않았어요. 큐시트에 다 남아 있죠. 2막에서 윤세라 씨가 3분 늦게 나와 암전을 늘려야 했어요. 그 3분 동안 그 사람이 어디 있었는지 물어보세요.',
      reactions: {
        cue_sheet: { text: '보세요. 제가 공연 중에 바로 적어 둔 메모예요. 급해서 손에 잡히는 펜으로 썼을 뿐이에요.' },
        cue_log: { text: '배우가 늦으면 암전을 늘리는 게 제 일이에요. 기록이 길게 남은 건 당연하죠.' },
        yujin_truth: { text: '…창이 비어 있었다고요? 잠깐 콘솔 아래로 몸을 숙였을 거예요. 신입이 어두운 데서 잘못 본 거겠죠.' },
        gloves: { text: '무대 정리할 때 끼는 장갑이에요. 금박이야 소품에서 묻었겠죠.', again: '소품이라고 했잖아요. …그 트로피 금박이랑 같다는 거예요?' },
        contract: { text: '…그건 처음 보는 서류예요. 대표님이 그럴 리 없어요.', again: '그만하세요. 이 극장은 대표님 혼자 것이 아니었어요.' },
        taemin_truth: { text: '태민이 빚 때문에 나를 끌어들이는 거예요. 다투긴 했지만 그건 공연 전 일이었어요.' },
        trophy: { text: '대표님 첫 수상작 때 받은 트로피예요. 그 무대도 제가 만들었어요.' },
        lantern: { text: '소품 관리도 제 일이에요. 신입이 또 사고를 쳤군요.' },
        phone: { text: '9시 16분이면 2막 중반이에요. 저는 조정실에서 큐를 잡고 있었어요.' },
      },
      fallback: '기록에 없는 건 말씀드릴 수 없어요.',
      pressed: '같은 질문에는 같은 답밖에 없어요.',
    },
    {
      id: 'yujin', name: '차유진', role: '신입 배우',
      portrait: { image: 'assets/scenario4/characters/yujin.png' },
      intro: '입단 1년 차 신입 배우다. 다음 시즌 주연으로 내정되었다는 소문이 돌고 있다.',
      talk: '저는 시키는 대로 했을 뿐이에요. 주연 얘기도 대표님이 먼저 꺼내신 거고요. 오늘 무슨 일이 있었는지는… 세라 선배한테 물어보세요.',
      reactions: {
        script_memo: { text: '저도 오늘 처음 알았어요. 그런데 인터미션에 세라 선배가 대표님 뺨을 때리는 걸 봤어요. 그 얘기를 들은 것 같았어요.', gives: 'yujin_slap' },
        sera_counter: { text: '…죄송해요. 암전 때 랜턴을 떨어뜨려서 무대 옆에 숨어 있었어요. 혼날까 봐 말을 못 했어요. 그때 조정실 창을 올려다봤는데 아무도 없었어요. 세라 선배는 입구에서 큐를 기다리고 있었고요.', gives: 'yujin_truth' },
        lantern: { text: '그, 그건… 제가 들고 나가는 소품이에요. 그냥 손에서 미끄러진 거예요.' },
        cue_sheet: { text: '세라 선배가 늦었다고요? 저는 입구에 선배가 서 있는 걸 봤는데….' },
        cue_log: { text: '암전이 그렇게 길었어요? 저는 숨어 있느라 시간 가는 줄도 몰랐어요.' },
        trophy: { text: '대표님이 저한테도 보여 주셨어요. 언젠가 너도 받을 거라고요.' },
        contract: { text: '극장이 팔린다고요? 그럼 제가 설 무대는요?' },
        gloves: { text: '그런 장갑은 승희 선배 같은 스태프분들만 껴요.' },
      },
      fallback: '잘 모르겠어요.',
      pressed: '그건 정말 말씀드린 게 다예요.',
    },
  ],

  accusation: {
    code: 'MOONLIGHT · CASE 02',
    intro: '남궁혁의 죽음에 대한 결론을 기록하세요. 범인과 수법, 동기를 모두 특정해야 합니다.',
    questions: [
      { key: 'culprit', label: '범인', options: [
        { id: 'sera', label: '윤세라' }, { id: 'taemin', label: '고태민' }, { id: 'seunghee', label: '백승희' }, { id: 'yujin', label: '차유진' },
      ] },
      { key: 'method', label: '수법', options: [
        { id: 'intermission', label: '인터미션에 분장실을 찾아감' }, { id: 'late', label: '등장을 늦추고 그 틈에 분장실로 감' }, { id: 'blackout', label: '암전을 늘려 조정실을 비움' }, { id: 'debt', label: '빚 문제로 찾아가 다투다 내리침' },
      ] },
      { key: 'motive', label: '동기', options: [
        { id: 'role', label: '주연 자리를 지키려고' }, { id: 'debt', label: '빚을 갚지 않으려고' }, { id: 'sale', label: '극장 매각을 막으려고' }, { id: 'mistake', label: '자기 실수를 숨기려고' },
      ] },
    ],
    answer: { culprit: 'seunghee', method: 'blackout', motive: 'sale' },
  },

  endings: {
    success: [
      '백승희는 빨간 펜으로 쓴 메모를 오래 내려다보았다.',
      '대표가 극장을 몰래 팔기로 했다는 사실을 알고, 그녀는 2막 빗소리 암전을 40초에서 3분 30초로 늘렸다. 그 어둠 속에서 조정실을 비우고 분장실로 내려가 트로피를 휘둘렀다.',
      '늘어난 암전이 의심받지 않도록 큐시트에 윤세라의 지각을 나중에 적어 넣은 것도 그녀였다.',
      '지원 경찰이 도착했을 때, 텅 빈 무대 위에는 가짜 눈만 소리 없이 쌓여 있었다.',
    ],
    fail: [
      '사건은 배우들 사이의 다툼으로 정리되었다.',
      '윤세라는 끝까지 결백을 주장했지만, 큐시트의 메모가 그녀를 가리켰다.',
      '다음 날 달빛극장의 매각 계약은 서명할 사람 없이 미뤄졌다.',
    ],
  },
};
