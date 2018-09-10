import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import TransitionItem from '../../components/TransitionItem/TransitionItem';

const TextContainer = styled.div`
  padding: 25px;
  background: #fff;
  margin: 0;
  line-height: 1.6;
  flex: 1;
  overflow: auto;
`;

const ScrollWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const Scrollable = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
`;

const Paragraph = styled.p`
  margin: 0 0 15px;
`;

class About extends React.Component {
  render() {
    return (
      <TransitionItem>
        <Header hasBackButton={true} title="About" showAboutMenuItem={false} />

        <ScrollWrapper>
          <Scrollable>
            <TextContainer>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad cum
                delectus, deserunt, esse et facere facilis ipsa iste iusto nihil
                odio quidem quis, sed tempore tenetur voluptates voluptatum.
                Doloribus, ratione?
              </Paragraph>

              <Paragraph>
                Corporis, dignissimos doloribus excepturi fuga iste reiciendis
                sequi? Eveniet, molestias, voluptatibus! Accusantium eaque
                fugit, iure laborum, mollitia non porro quibusdam recusandae,
                saepe soluta ut voluptas? Mollitia similique temporibus ullam
                unde.
              </Paragraph>
              <Paragraph>
                Accusamus ad beatae consequuntur dicta dolores dolorum eveniet
                ipsum, molestiae nihil nisi quod saepe vitae voluptatem.
                Accusamus aliquid enim explicabo fugit, id laboriosam libero
                minima modi qui quo unde voluptatem.
              </Paragraph>
              <Paragraph>
                Aut, consequuntur, omnis! A aliquam animi assumenda consectetur
                dicta dolorem dolorum eum illo illum ipsa iusto magnam, magni
                nam nihil nulla odio odit, quas quis rem sapiente tempora
                temporibus ut.
              </Paragraph>
              <Paragraph>
                Aut, consequuntur, omnis! A aliquam animi assumenda consectetur
                dicta dolorem dolorum eum illo illum ipsa iusto magnam, magni
                nam nihil nulla odio odit, quas quis rem sapiente tempora
                temporibus ut.
              </Paragraph>
              <Paragraph>
                A accusamus adipisci architecto, autem consectetur deleniti
                dolor eius explicabo in natus odit perferendis praesentium qui
                quis ratione, rem sequi voluptas voluptatem. Aliquid dicta id
                neque, optio tenetur unde voluptas.
              </Paragraph>
              <Paragraph>
                Atque debitis in, laborum nam pariatur provident quo tempora
                veritatis. Deserunt earum eius exercitationem facere magni
                praesentium provident temporibus ut! Accusantium adipisci
                consectetur cumque eos error in pariatur quae ratione?
              </Paragraph>
              <Paragraph>
                At dicta distinctio exercitationem fugiat incidunt. Ad
                architecto ea earum eius eveniet maiores minima, modi neque
                obcaecati pariatur quae, quam quia quibusdam recusandae saepe
                sed sunt unde ut velit voluptates!
              </Paragraph>
              <Paragraph>
                Dignissimos dolorum impedit inventore, nemo perspiciatis quae
                quas ullam? Asperiores aspernatur assumenda aut delectus
                deserunt dignissimos doloremque error maiores odio praesentium
                quae, repellat, sed sequi, sint sit temporibus tenetur
                veritatis!
              </Paragraph>
            </TextContainer>
          </Scrollable>
        </ScrollWrapper>
      </TransitionItem>
    );
  }
}

export default withRouter(About);
