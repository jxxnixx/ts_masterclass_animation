// 7.2 - Animation

// framer motion으로 <div>이런 형식으로 사용은 불가함
// animate하고 싶은 요소가 무엇이든, motion 패키지로부터 나와야 함.
// div 요소를 사용하고 싶다면 
// <motion.div> 이렇게 사용해야 하는 것.

// css를 건들 필요 없이, 적절한 props의 사용만으로 animation 생성 가능

// spring - 현실 세계의 물리법칙 시뮬레이트.
// force, elasticity, stiffness...

// 초기 initial -> 최종 animate

function App() {
    return (
      <Wrapper>
        <Box 
          transition = {{type : "spring", delay : 0.5}}
          initial = {{scale : 0}}
          animate = {{scale : 1, rotateZ : 360}}
        />
      </Wrapper>
    );
}


// 7.3 - Variants part 1

// variants를 쓰면 컴포넌트 코드가 좀더 깔끔해짐!
// variants : 기본적으로 애니메이션의 stage

const myVars = {
    start : {scale : 0},
    end : {scale : 1, rotateZ : 360, transition : {type : "spring", delay : 0.5}}
  }
  
  function App() {
    return (
      <Wrapper>
        <Box variants={myVars} initial="start" animate="end"/>
      </Wrapper>
    );
  }
  
// 7.4 - Variants part 2

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  place-self: center;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

// 부모 컴포넌트 상에서 variants를 사용하면
// motion이 그것을 자식 컴포넌트에게 자동으로 붙여넣어 줌!

// 부모와 자식 컴포넌트의 variants의 요소 이름을 동일하게 지정할 경우
// variants = {...} 이 부분에 들어갈 부분만 수정해 주면 
// 뒷부분은 그대로 사용할 수 있음! 
// 부모의 것을 자동으로 자식이 가져가기 때문에!

const boxVariants = {
    start: {
      opacity : 0,
      scale : 0.5,
    },
    end : {
      scale : 1,
      opacity : 1, 
      transition : {
        type : "spring",
        duration : 0.5,
        bounce : 0.5,
        delayChildren : 0.5,
        staggerChildren : 0.2,
      },
    },
  };
  
  const circleVariants = {
    start : {
      opacity : 0,
      y : 10,
    },
    end : {
      opacity : 1,
      y : 0,
    },
  };
  
// orchestration의 delay - 애니메이션 지연
// ~의 delay children 사용하면 굿굿
// 부모 컴포넌트의 variants에서 delayChildren 사용 시
// 원하는 대로 자식 컴포넌트에 적용 가능
// 우리가 정확히 원하는 것은, staggerChildren 순차적으로 딜레이 가능

// variants로 자식 컴포넌트까지 설정할 수 있음!

function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box>
    </Wrapper>
  );
}


///// 7.5 - Gestures part 1

// 마우스 이벤트, 드래그 이벤트, 영역 설정..

/// while prop

<Box whileHover={{scale : 2}} whileTap={{borderRadius : "100px"}} />

// 최종 예시 코드

<Box 
whileHover={{scale : 1.5, rotateZ : 90}} 
whileTap={{scale : 1, borderRadius : "100px"}} 
/>

// 여기에 variants를 사용해 보자!

const boxVariants = {
  hover : {scale : 1.5, rotateZ : 90},
  click : {scale : 1, borderRadius : "100px"},
};

function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} whileHover="hover" whileTap="click" />
    </Wrapper>
  );
}

// 근데 여기서 상황에 따른 조건문을 사용하려면,
// whileHover={condition ? "hover" : "other"} 이런 식으로 사용 가능

/// Dragging
// 1) 제한 없는 dragging

<Box drag // 여기에 drag만 추가해 주면 됨! 굿
variants={boxVariants} whileHover="hover" whileTap="click" />

// Drag 시 애니메이션 설정

<Box
  drag
  variants={boxVariants}
  whileHover="hover"
  whileDrag={{
    backgroundColor: "rgb(46, 204, 113)",
    transition: { duration: 10 },
  }}
  // 여기에 blue 이런 식으로 쓰게 되면 string이므로 animate 하기 굉장히 어려움.
  // 따라서 rgba나 rgb를 사용해 정수 형식으로 사용해야 함!
  whileTap="click"
/>

// Variants 사용

const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
  drag: { backgroundColor: "rgb(46, 204, 113)", transition: { duration: 10 } },
};

function App() {
  return (
    <Wrapper>
      <Box
        drag
        variants={boxVariants}
        whileHover="hover"
        whileDrag="drag"
        whileTap="click"
      />
    </Wrapper>
  );
}

// 2) 제한 있는 dragging

// 제약 1 : 한 방향으로만 스크롤 잠그기
<Box
  drag = "x" // x축으로만 드래그 가능
  variants={boxVariants}
  whileHover="hover"
  whileDrag="drag"
  whileTap="click"
/>

// 제약 2 : 드래그 가능한 영역 설정 dragConstraints

<Box
  drag
  dragConstraints = {{top : 0, bottom : 0, left : 0, right : 0}}
  variants={boxVariants}
  whileHover="hover"
  whileDrag="drag"
  whileTap="click"
/>

// 제약 3 : 박스 안에 박스 넣기. 다른 박스의 크기에 맞게 드래깅 제약.


const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: { rotateZ: 90 },
  click: { borderRadius: "100px" },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragSnapToOrigin
          // 얘가 있으면 박스를 놓았을 때 가운데로 돌아옴
          // 없으면 큰 박스 내부에서 멈춤!
          dragElastic={0}
          // 이게 0이면 큰 박스 밖으로 나가지 않음!
          // 1이면 아무 제약 없이 나가고
          dragConstraints={biggerBoxRef}
          variants={boxVariants}
          whileHover="hover"
          whileTap="click"
        />
      </BiggerBox>
    </Wrapper>
  );
}


///// 7.7 - MotionValues part 1

// MotionValue -> 내 애니메이션 내의 수치를 트래킹할 때 필요

function App() {
  const x = useMotionValue(0);
  // x의 값 트래킹. 따라서 박스 위치가 바뀔 때마다 값이 변함
  return (
    <Wrapper>
      <Box style={{ x }} drag="x" dragSnapToOrigin />
      {/* 즉, useMotionValue의 x를 style의 x와 연결한 것. 
      style의 x좌표가 바뀔 때마다 motionValue역시 업데이트 될 것!*/}
    </Wrapper>
  );
}

// MotionValue는 특별함.
// MotionValue가 업데이트 될 때에는,
// React Rendering Cycle 렌더링 사이클을 발동시키지 않음.
// 그 말은 MotionValue가 ReactJS의 State가 아니라는 것.
// 그래서 MV 가 바뀌어도 컴포넌트가 다시 렌더링되지는 않음.
// 오히려 좋은 것임. 굿굿. 계속 트래킹할 때마다 리렌더링되면 에바지

// 그럼 우리는 useEffect를 이용해 x값을 보자!

function App() {
  const x = useMotionValue(0);
  
  useEffect(() => {
    x.onChange(() => console.log(x.get()));
  }, [x]);

  return (
    <Wrapper>
      <Box style={{ x }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

// 또, 누르면 x값을 손수 설정할 수 있는 버튼을 만들어 보자!

function App() {
  const x = useMotionValue(0);

  return (
    <Wrapper>
      <button onClick={() => x.set(200)}>click me</button> 

      <Box style={{ x }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

///// 7.8 - MotionValues part 2

// transformation
// 박스를 드래그할 때, 크기를 점점 커지고 작아지게 해 보자!
// x값이 -800 이면 scale을 2로 설정하고, 800이면 scale을 0으로 설정하자!
// 단, 그 수치뿐만 아니라 그 사이의 모든 숫자들도 점차적으로 적용될 수 있도록

// useTransform hook을 사용할 것!

function App() {
  const x = useMotionValue(0);
  const potato = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
  // useTransform은 일단 값을 하나 받음. 우리가 설정한 const x!
  // 그리고 그 값의 어떤 제한값이랑 원하는 출력값을 받을 것.
  // 즉, x와 조건이 되는 input과 output인데, 
  // input과 output은 반드시 같은 배열 크기를 가져야 함!

  useEffect(() => {
    potato.onChange(() => console.log(potato.get()));
  }, [x]);

  return (
    <Wrapper>
      <Box style={{ x }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

// 이제, 이 potato를 state와 연결시키자.

return (
  <Wrapper>
    <Box style={{ x, scale : potato }} drag="x" dragSnapToOrigin />
  </Wrapper>
);

// 이렇게 Box 컴포넌트의 style에 scale : potato를 추가해주면 됨!

// 최종 코드
function App() {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);

  return (
    <Wrapper>
      <Box style={{ x, scale }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

///// 7.9 MotionValues part 3

// useTransform은 숫자뿐만 아니라 색깔도 transform 가능!

// rotate

function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);

  return (
    <Wrapper>
      <Box style={{ x, rotateZ }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

// background-color

const Wrapper = styled(motion.div)` //변경
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );

  return (
    <Wrapper style={{ background: gradient }}>
      <Box style={{ x, rotateZ }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

// Listening Scroll

// MotionValues 의 Helper Function인 useViewportScroll 사용
// MotionValue -> state 아님, 재렌더링 발동하지 않음

// 우린 수직 방향만 할 거니까, scrollY 에 집중. 픽셀 단위 수직 스크롤
// scrollYPRogress : 0과 1사이 값

const Wrapper = styled(motion.div)`
  height: 200vh; // 크기 변경. scroll 위해
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );

  const { scrollYProgress } = useViewportScroll();  // 추가
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]); // 추가
  // 스크롤 위치에 따른 크기 변경

  return (
    <Wrapper style={{ background: gradient }}>
      <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}


///// 7.10 SVG Animation

const Wrapper = styled(motion.div)`
  height: 100vh; // 100으로 다시 변경
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Svg = styled.svg`
  width: 300px;
  height: 300px;
`;
// 모든 svg는 path를 가지고, path는 fill을 가짐 (fill은 아래에 쓰임)

function App() {
  return (
    <Wrapper>
      <Svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          stroke="white"
          // stroke : 테두리 선 색 설정 가능
          strokeWidth="2"
          // strokeWidth
          fill="transparent"
          // currentColor : path가 Svg의 color를 가질 것이라는 뜻. 기본값은 black.
          // transparent -> 여기선 투명.
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        ></path>
      </Svg>
    </Wrapper>
  );
}

// fill opacity animate부터 건드려 보자!
// 그러려면 위처럼 그냥 path를 쓰면 안 됨. motion.path를 써야지.

// 결론적으로, 천천히 하얀색으로 채우는 효과를 구현한 코드 : 

function App() {
  return (
    <Wrapper>
      <Svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <motion.path
          initial={{ fill: "rgba(255, 255, 255, 0)" }}
          // 처음 상태, opacity 0
          animate={{ fill: "rgba(255, 255, 255, 1)" }}
          // 변화할 상태, opacity 1
          transition={{ duration: 5 }}
          // 완성되는 데 걸리는 시간
          stroke="white"
          strokeWidth="2"
          fill="transparent"
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        ></motion.path>
      </Svg>
    </Wrapper>
  );
}

// 이제 pathLength 수정.
// pathLength : 현재 우리 위치까지의 path의 길이
// 이걸 0에서 1로 하면, 그림 그리는 것처럼 스스륵 생긴다구! 개멋져!
// 일단 이걸 확인하기 위해 opacity를 전부 0으로 해 보고 돌려보자.

function App() {
  return (
    <Wrapper>
      <Svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <motion.path
          initial={{ pathLength: 0, fill: "rgba(255, 255, 255, 0)" }}
          animate={{ pathLength: 1, fill: "rgba(255, 255, 255, 0)" }}
          transition={{ duration: 5 }}
          stroke="white"
          strokeWidth="2"
          fill="transparent"
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        ></motion.path>
      </Svg>
    </Wrapper>
  );
}

// 아니 이거봐 개멋져 개멋지다고 악악
// 여기다가 이제 opacity 1로 끝나도록 다시 바꿔주면?

function App() {
  return (
    <Wrapper>
      <Svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <motion.path
          initial={{ pathLength: 0, fill: "rgba(255, 255, 255, 0)" }}
          animate={{ pathLength: 1, fill: "rgba(255, 255, 255, 1)" }}
          transition={{ duration: 5 }}
          stroke="white"
          strokeWidth="2"
          fill="transparent"
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        ></motion.path>
      </Svg>
    </Wrapper>
  );
}

// 악 악악 개멋지다고 악악

// 우린 이것들을 variants 안에 넣을 수도 있어!

const svg = {
  start: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  end: {
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
    transition: { duration: 5 },
  },
};

// 그리구 svg 컴포넌트 안에 넣을 수도 있어!

const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white;
    stroke-width: 2;
  }
`;

// 그러면 깔끔하게 코드 정리!

function App() {
  return (
    <Wrapper>
      <Svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <motion.path
          variants={svg}
          initial="start"
          animate="end"
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        ></motion.path>
      </Svg>
    </Wrapper>
  );
}

// 이제, 특정 property의 animation duration을 단독으로 변경해 보자!

// 현재 상태에서는, svg의 색상이 채워지는 데에도, 테두리가 완성되는 데에도
// 똑같이 5초가 걸림.
// 이걸 따로따로 적용시키고 싶다면?
// 테두리를 먼저 그린 다음에, 색상이 채워지게 하려면?

// 특정 property의 transition time을 정해주면 되겠지!

const svg = {
  start: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  end: {
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
    transition: { duration: 5 },
    // 이렇게 하면 pathLength나 fill이나 똑같이 5초가 걸리니까,
    // 여기서 이 부분을 지우고
  },
};

function App() {
  return (
    <Wrapper>
      <Svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <motion.path
          variants={svg}
          initial="start"
          animate="end"
          // 여기에 transition 추가!
          // fill만 따로 효과 적용!
          transition={{
            default: { duration: 5 },
            fill: { duration: 1, delay: 3 },
          }}
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        ></motion.path>
      </Svg>
    </Wrapper>
  );
}

///// 7.11 - AnimatePresence


/// animate presence란 ? component!
// 단, react.js에서 사라지는 component를 animate하는.

// 일단, 버튼을 만들고 그 버튼에 따라 나타났다 사라지는 박스를 만들자.
// 일반적인 리액트로 구현부터 ㄱㄱ

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing((prev) => !prev);
  return (
    <Wrapper>
      <button onClick={toggleShowing}>Click</button>
      {showing ? <Box /> : null}
    </Wrapper>
  );
}

// 이렇게 하면 구현 완료.

// 이때, 내가 하고 싶은 건
// Box 가 없어질 때 Box를 animate하는 것임.
// 일반 react.js에서는 불가능. 
// 왜냐하면 내가 버튼을 클릭하는 순간,
// showing이 false가 되기 때문에 바로 null을 리턴할 것이므로

// 그런데, motion을 사용하면 animate 가능.


// import 해 주자!
import { AnimatePresence, motion } from "framer-motion";

// animatepresence의 한 가지 규칙은, visible 상태여야 한다는 것.
// 그리고, animatepresence의 내부에는 condition(조건문)이 있어야 한다는 것.
// Box를 보여주거나 보여주지 않는 것과 관련한.

// AnimatePresence가 항상 visible이어야 한다는 것은, 
// 위 코드에서 조건문 안에 있는 Box 컴포넌트의 위치에 
// <AnimatePresence /> 이렇게 자리하면 안 된다는 것

// 이제,  motion, animatepresence와 variants를 사용해 
// 구조적으로 예쁜 코드를 짜 보자.

const boxVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 50,
  },
};

function App() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing((prev) => !prev);
  return (
    <Wrapper>
      <button onClick={toggleShowing}>Click</button>
      <AnimatePresence>
        {showing ? (
          <Box
            variants={boxVariants}
            initial="initial"
            animate="visible"
            exit="leaving"
            // state 'exit' : style 설정 가능
            // element가 사라질 때 어떤 amnimation을 발생시킬지를 정하는 것.
            // AnimatePresence 컴포넌트 안에서, 조건에 따른 Box 컴포넌트 안에서 사용.
          />
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

///// 7.12 - Slider part 1

// 위의 것들 말고도, AnimatePresence를 사용하면 엄청 많은 것을 할 수 있음!

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing((prev) => !prev);
  return (
    <Wrapper>
      <AnimatePresence>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <Box key={i}>{i}</Box>
        ))}
      </AnimatePresence>
    </Wrapper>
  );
}

// 이렇게 하면, 1부터 10까지의 박스가 한 줄로 정렬되어 한꺼번에 나타남.
// 이 아이들을 한 번에 한 개만 보여주도록 해보자!


function App() {
  const [visible, setVisible] = useState(1);
  // visible state를 만들어 주고,
  // i가 visible과 같은지 확인한 후 Box를 보여줄 것.
  // visible 이 변화하는 값!

  const nextPlease = () => setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  // 숫자를 바꿔주기 위해 nextPlease라는 함수를 만들어 숫자를 증가시키자!
  // 버튼 누르면 바뀌도록 설정.

  const prevPlease = () => setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  // prev 버튼도 간단히 만들 수 있는데,
  // 이렇게 만들면 적용되는 animation은 next 버튼과 동일하기 때문에
  // 반대 방향으로 바꿔줘야 함!
  // 이건 다음 영상에서 ㄱㄱ
  
  return (
    <Wrapper>
      <AnimatePresence>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
          i === visible ? (
            <Box
              variants={box}
              // 사용된 variants는 아래에 있음!
              initial="invisible"
              animate="visible"
              exit="exit"
              key={i}
            >
              {i}
            </Box>
          ) : null
        )}
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
      <button onClick={prevPlease}>prev</button>
    </Wrapper>
  );
}

// 여기에, variants를 이용해 스타일과 애니메이션을 추가해 보자.

const box = {
  invisible: {
    x: 500,
    opacity: 0,
    scale: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    // transition을 추가해서 duration이나 delay 설정도 가능!
    transition: {
      duration: 1,
    },
  },
  exit: {
    x: -500,
    opacity: 0,
    scale: 0,
    transition: { duration: 1 },
  },
};

// invisible 상태에서 x의 위치가 500이고 visible에서 0이므로
// 박스가 나타날 땐 X축 500만큼의 위치에서 오니까 오른쪽에서 나타날 것이고
// visible의 x위치가 0이고 exit가 -500이므로
// 박스가 사라질 땐 왼쪽으로 사라질 것임.

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  // 근데 박스 위치가 약간 문제가 있어 보이니까,
  // position : absolute와 top : 100px을 추가해 주자!
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

// 그러니까, 우리는 나타날 Box와 사라질 Box만 특정해 주면 됨.
// Framer Motion이 우리를 위해 모든 것을 해줄 것이므로! 끼악!

// 최종 리턴 코드 :

return (
  <Wrapper>
    <AnimatePresence>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
        i === visible ? (
          <Box
            variants={box}
            initial="invisible"
            animate="visible"
            exit="exit"
            key={i}
          >
            {i}
          </Box>
        ) : null
      )}
    </AnimatePresence>
    <button onClick={nextPlease}>next</button>
    <button onClick={prevPlease}>prev</button>
  </Wrapper>
);

// prev 버튼 animtation 을 바꿔 보자!


///// 7.13 - Slider part 2

// react.js에서 map을 사용하면, 고유의 key값이 필요한데,
// 이는 우리가 1부터 10까지 각 Box들의 숫자를 하나하나 설정해 줄 필요 없이
// key값을 이용할 수 있다는 것을 의미함.
// 코드로 보면, 아까 짜 둔 로직을 이용해

return (
  <Wrapper>
    <AnimatePresence>
      <Box
        variants={box}
        initial="invisible"
        animate="visible"
        exit="exit"
        key={visible} // !
      >
        {visible} // !
      </Box>
    </AnimatePresence>

    <button onClick={nextPlease}>next</button>
    <button onClick={prevPlease}>prev</button>
  </Wrapper>
);

// 이렇게 하면 똑같이 동작함!
// 개체의 고유한 값인 key값만 변경시키는 것인데,
// key가 바뀌면 react.js는 새 component가 생겼다고 생각해
// component를 리렌더링해줌!
// 그래서 이전의 것들(component, 여기선 box)을 버리고 새 것을 보여주는 것임.
// 이 과정에서도 initial, animate, exit이 세 가지 animation이 모두 실행됨.
// 이전 component와 새 component 모두!


// 이제, 여기에 방향을 추가해 prev 버튼의 animation을 수정해 주자!
// custom 이란 property를 사용해서!

// custom : variants에 데이터를 보낼 수 있게 해 주는 property
// 예를 들면, 우리가 가고자 하는 방향에 따라 invisible과 exit을 바꾼다든지.

const box = {

  // entry에 (back : boolean) 여부에 따른 return값을 받으려면,
  // => {...} 이 형식이 아닌, 괄호로 감싼 => ({...}) 이 형식으로 작성해줘야 함.
  // 아니면 { ... return { ... } } 이렇게 해 주든지! 근데 ({...}) 이 깰끔한듯.
  entry: (isBack: boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: (isBack: boolean) => ({
    x: isBack ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: { duration: 0.3 },
  }),
};



function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false); // !
  const nextPlease = () => {
    setBack(false); // !
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prevPlease = () => {
    setBack(true); // !
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };

  // custom은, motion.div에서 쓸 수 있음.
  // 그리고 custom을 쓰면, variants를 바꿀 수 있음.
  // variants는 원래 여러 obj를 가진 obj 였지만, custom을 사용하고 싶다면, 
  // variants를 obj를 return하는 function으로 바꿔야 함.
  // 하지만 그 data(back)는 react.js로부터 올 것임.

  return (
    <Wrapper>
      <AnimatePresence>
        <Box
          custom={back}
          variants={box}
          initial="entry"
          animate="center"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
      <button onClick={prevPlease}>prev</button>
    </Wrapper>
  );
}


// 그런데, 이 상황에서는, next 버튼을 누르면
// 2번 Box의 exit animation과 3번 Box의 entry animation이 거의 동시에 시작함.

// 이걸 바꾸고 싶으면, exitBeforeEnter를 쓰면 됨.

return (
  <Wrapper>
    <AnimatePresence exitBeforeEnter custom={back}> // 여기!
      <Box
        variants={box}
        initial="entry"
        animate="center"
        exit="exit"
        key={visible}
      >
        {visible}
      </Box>
    </AnimatePresence>
    <button onClick={nextPlease}>next</button>
    <button onClick={prevPlease}>prev</button>
  </Wrapper>
);

// 이건 exit을 실행시키고, exit이 끝나면, 다음 element를 올 수 있게 함.
// 즉 하나가 끝나고 난 뒤에야 다음 것이 나타나도록 하는 것.
// 지금 이 상황에는 딱히 좋아 보이지는 않지만, 다른 상황에 이용 가능함. 중요!


///// 7.14 - You need to watch this 
///          (layout animation, shared layout animation)

// 박스 내부에 원을 하나 만들자!

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

// 그리고 클릭 시, 
// Box의 justify-content와 align-items를 
// center 가 아니라, felx-start로 바꿔줄 것!

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);

  return (
    <Wrapper onClick={toggleClicked}>
      <Box
        style={{
          justifyContent: clicked ? "center" : "flex-start",
          alignItems: clicked ? "center" : "flex-start",
        }}
      >
        <Circle />
      </Box>
    </Wrapper>
  );
}

// 짱 멋진 prop을 보여줄 건데, layout prop임.
// 이 prop을 element에게 주면 
// 그 element의 layout이 바뀔 때, 알아서 animate가 됨.

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);

  return (
    <Wrapper onClick={toggleClicked}>
      <Box
        style={{
          justifyContent: clicked ? "center" : "flex-start",
          alignItems: clicked ? "center" : "flex-start",
        }}
      >
        <Circle layout /> // 여기!!!
      </Box>
    </Wrapper>
  );
}

// Framer Motion은 무언가 외부의 힘에 의해 바뀐 것을 감지하고,
// 이 경우 Circle은 새 위치에 있으므로,
// 단지 layout이라는 prop을 넣는 것만으로
// CSS의 변화가 자동으로 animate될 것임.

// 그니까, style이나 CSS는 state에 의해 바뀔 수 있음!
// 그리고 그 변화가 element를 움직이게 할 수 있는 것임.
// 근데 layout은, 그 자체를 사용하는 것보다
// 사용을 위한 환경을 만드는 데 시간이 훨씬 많이 소요됨.
// 이것이 최고는 아니란 소리! 
// 최고는, shared layout animation이라는 것임! 짜잔!


// shared layout animation 사용을 위한 환경을 다시 짜 보자.
// 박스를 두 개로 늘리고, 클릭했는지 안했는지에 따라 
// 원을 표시하거나 숨기는 것을 원해!
// 그리고 그건 clicked의 여부에 따라 갈릴 텐데, 
// 두 박스의 조건을 반대로 설정할 것임.

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);

  return (
    <Wrapper onClick={toggleClicked}>
      <Box>{!clicked ? <Circle /> : null}</Box>
      <Box>{clicked ? <Circle /> : null}</Box>
    </Wrapper>
  );
}


// 이게 중요한 이유는, 각각의 서로 다른 component에서 동작한다는 것.
// 2개 각각의 Box, 2개 각각의 Circle


// 여기서 우리는, Framer에게, 이 두 Circle은, 
// 사용자의 눈에 똑같이 보여야 한다고 말해줄 것임.
// animation이 있어야 함.
// 이 2개의 Circle이, 이 2개의 다른 component가, 같은 component라고
// Framer에게 말해줘야 한다는 것!
// 이 둘을 연결해야 한다는 것!

// 이건 굉장히 쉬움. 우리가 그냥 저 Circle component에 
// 같은 값의 layoutId만 추가해주면 됨.
// 이 prop은 Framer에게 이 두 component가 같다고 말해줄 것.
// 정확히는 UI component. 그럼 연결되지롱!

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);

  return (
    <Wrapper onClick={toggleClicked}>
      <Box>{!clicked ? <Circle layoutId="circle" /> : null}</Box>
      <Box>{clicked ? <Circle layoutId="circle" /> : null}</Box>
    </Wrapper>
  );
}

// 아니 제발 돌려봐 진짜 미쳤다니까? 개 오진다고 연결됐다고 animation이!!!

// 응용 쌉가능 제발 해봐 제발 

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);

  return (
    <Wrapper onClick={toggleClicked}>
      <Box>
        {!clicked ? (
          <Circle layoutId="circle" style={{ borderRadius: 50 }} />
        ) : null}
      </Box>
      <Box>
        {clicked ? (
          <Circle layoutId="circle" style={{ borderRadius: 0, scale: 2 }} />
        ) : null}
      </Box>
    </Wrapper>
  );
};

