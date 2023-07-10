///// 7.15 - Final Project part 1

// 4개 Box들을 설정해준 뒤,
// 클릭한 박스를 중앙으로 animate 되도록 만들어 보자!

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const [clicked, setClicked] = useState(false);
  const toggle = () => setClicked((prev) => !prev);

  return (
    <Wrapper onClick={toggle}>
      <Grid>
        <Box />
        <Box />
        <Box />
        <Box />
      </Grid>
    </Wrapper>
  );
}

// 앞에서 했던 것처럼, 두 단계를 animate 하는 것은 layout 등을 사용하면 되므로
// 굉장히 쉬움! 그러니까 로직을 짜기만 하면 됨.

/// step 1.
// 한 Box를 클릭하면, 다른 element(Overlay)를 보여줄 것이고,
// 이 element는 다른 모든 것보다 위에 있을 것임!
// 말하자면 position은 absolute일 것. 그러면 모든 것의 위에 위치!
// 그니까 Box를 클릭했을 때 뜨는 커다란 Box가 아니고,
// 어두워지는 화면 자체가 Overlay인 것!

// Overlay를 화면에 표시할 때, 그냥 하면 너무 느닷없으니까
// exit 효과를 넣어주자! animatePresence를 이용해서.
// 그러려면, Overlay component의 styled component를 설정할 때
// const Overlay = styled.div`...`; 형식이 아니고
// const Overlay = styled(motion.div)`...`; 여야 함.

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 그리고 Overlay component를 사용할 때 style을 작성해 주든지
// variants를 이용하든지 하자!

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

/// step 2.
// Overlay component안에, Box component를 만들자!
// 얘도 마찬가지로, style을 작성해 주든지 variants를 이용하든지 하자.

// 여기서, 위에 작성해 준 4개의 Box component와
// Overlay 안에 작성해 준 Box component는 다른 component임!

// 근데 근데, layoutId를 사용하면,
// 두 element의 서로 다른 상태를 연결해 주는 animate가 작동하면서
// 클릭 시 해당 component가 확대되는 효과를 구현할 수 있는 것임!!!! 이게 뭐임!!!!!!!!!1

function App() {
  const [clicked, setClicked] = useState(false);
  const toggle = () => setClicked((prev) => !prev);

  return (
    <Wrapper onClick={toggle}>
      <Grid>
        <Box layoutId="hello" />
        <Box />
        <Box />
        <Box />
      </Grid>
      <AnimatePresence>
        {clicked ? (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Box layoutId="hello" style={{ width: 400, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

// 이때, Overlay 내부의 Box의 투명도가 조금 이상하게 동작하는데
// 이는 해당 component의 부모인 Overlay의 opacity를 바꾸고 있기 때문임.
// 그러니까 Overlay의 opacity를 바꾸는 대신에,
// background의 opacity를 바꿔주자! 는 나중에~

///// 7.16 - Final Project part 2

/// 각 Box마다 id를 적용시킨, final code

function App() {
  const [id, setId] = (useState < null) | (string > null);

  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box onClick={() => setId(n)} key={n} layoutId={n} />
          // layoutId는 string이어야 하기 때문에, 숫자들을 string으로 저장해야 함.
          // 위처럼 해도 되고, 이렇게 해도 됨.
          /* {[1, 2, 3, 4].map((n) => (
            <Box onClick={() => setId(n)} key={n} layoutId={n+""} /> */

          // 또 중요한 것이, onClick = {() => setId(n)}으로 시작해야 함.
          // 클릭할 때만 실행되도록 할 것이니까!
          // onClick = {setId(n)}으로 하면 안됨. 이러면 즉시 실행이므로.

          // 결론적으로, 이 코드가 실행되면
          // layoutId가 각각 다른 4개의 Box가 생기는 것!
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          // id가 존재하면 Overlay 보여주기
          // 그런데, 주의할 것. layoutId로 animate되도록 연결해놨다고 해도,
          // 두 element가 서로 다른 것임을 잊으면 안 됨!
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            // Overlay 상태에서 다른 곳을 클릭하면, Overlay가 사라지도록!
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              // 사용자가 무엇을 클릭하든, 그걸 여기의 layoutId로 넣어줌.
              // 클릭을 하면, 그 숫자가 state로 갈 것이고,
              // 이 Box component를 렌더링할 것. 그 숫자 layoutId를 가지고.
              style={{ width: 400, height: 200 }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}
