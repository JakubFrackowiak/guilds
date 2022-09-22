import styled from "styled-components"
import styles from "../styles/Home.module.css"
import Quests from "components/Quests"

const Title = styled.div`
  font-size: 100px;
  margin-bottom: 100px;
`

export default function QuestsPage(): JSX.Element {
  return (
    <div className={styles.container}>
      <Title>Quests</Title>
      <Quests />
    </div>
  )
}
