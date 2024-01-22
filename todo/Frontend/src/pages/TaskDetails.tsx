import { useParams } from "react-router-dom";
import { TopBar } from "../components";
import styled from "@emotion/styled";
import { CategoryChip } from "../styles";
import { Avatar } from "@mui/material";
import NotFound from "./NotFound";
import { Clear, Done } from "@mui/icons-material";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const TaskDetails = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const formattedId = id?.replace(".", "");
  const task = user.tasks.find((task) => task.id.toString().replace(".", "") === formattedId);

  if (!task) {
    return <NotFound />;
  }

  return (
    <>
      <TopBar title="Task Details" />
      <Container style={{ boxShadow: `0 0 128px -8px ${task.color}` }}>
        <TaskName>Task: {task.name}</TaskName>
        <TaskTable>
          <tbody>
            <TableRow>
              <TableHeader>Description:</TableHeader>
              <TableData>{task?.description}</TableData>
            </TableRow>
            <TableRow>
              <TableHeader>Color:</TableHeader>
              <TableData>
                <ColorSquare clr={task.color} /> {task.color.toUpperCase()}
              </TableData>
            </TableRow>
            <TableRow>
              <TableHeader>Created:</TableHeader>
              <TableData>{new Date(task?.date || "").toLocaleString()}</TableData>
            </TableRow>
            {task?.lastSave && (
              <TableRow>
                <TableHeader>Last edited:</TableHeader>
                <TableData>{new Date(task?.lastSave || "").toLocaleString()}</TableData>
              </TableRow>
            )}
            {task?.deadline && (
              <TableRow>
                <TableHeader>Task deadline:</TableHeader>
                <TableData>{new Date(task?.deadline || "").toLocaleString()}</TableData>
              </TableRow>
            )}
            <TableRow>
              <TableHeader>Done:</TableHeader>
              <TableData>
                {task?.done ? <Done /> : <Clear />} {task?.done.toString()}
              </TableData>
            </TableRow>
            {task?.sharedBy && (
              <TableRow>
                <TableHeader>Shared by: </TableHeader>
                <TableData>{task.sharedBy}</TableData>
              </TableRow>
            )}
            <TableRow>
              <TableHeader>Categories:</TableHeader>
              <TableData>
                <CategoryContainer>
                  {task?.category?.map((cat) => (
                    <CategoryChip
                      key={cat.id}
                      backgroundclr={cat.color}
                      glow={false}
                      label={cat.name}
                      avatar={
                        cat.emoji ? (
                          <Avatar
                            alt={cat.name}
                            sx={{
                              background: "transparent",
                              borderRadius: "0px",
                            }}
                          >
                            {cat.emoji &&
                              (user.emojisStyle === EmojiStyle.NATIVE ? (
                                <div>
                                  <Emoji
                                    size={18}
                                    unified={cat.emoji}
                                    emojiStyle={EmojiStyle.NATIVE}
                                  />
                                </div>
                              ) : (
                                <Emoji
                                  size={20}
                                  unified={cat.emoji}
                                  emojiStyle={user.emojisStyle}
                                />
                              ))}
                          </Avatar>
                        ) : (
                          <></>
                        )
                      }
                    />
                  ))}
                </CategoryContainer>
              </TableData>
            </TableRow>
          </tbody>
        </TaskTable>
      </Container>
    </>
  );
};

export default TaskDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 32px;
  margin: 0 auto;
  margin-top: 100px;
  box-shadow: none;

  @media (min-width: 768px) {
    padding: 24px;
    width: 70%;
  }

  @media (min-width: 1200px) {
    width: 50%;
  }
`;

const TaskName = styled.h2`
  margin: 8px;
  text-align: center;
  font-size: 1.5em;

  @media (min-width: 768px) {
    font-size: 1.8em;
  }
`;

const TaskTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;

const TableRow = styled.tr`
  border-bottom: 2px solid #d9d9d9bc;

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 8px;
  font-size: 1em;

  @media (min-width: 768px) {
    font-size: 1.2em;
  }
`;

const TableData = styled.td`
  text-align: left;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1em;

  @media (min-width: 768px) {
    font-size: 1.1em;
  }
`;

const ColorSquare = styled.div<{ clr: string }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${({ clr }) => clr};
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
`;