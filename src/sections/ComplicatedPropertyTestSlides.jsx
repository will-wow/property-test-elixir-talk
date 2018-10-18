import React from "react";

import {
  Heading,
  Slide,
  SlideSet,
  CodePane,
  List,
  ListItem,
  S
} from "spectacle";

import NoteList from "../elements/NoteList";

import exampleBestPrice from "../code/exampleBestPrice.ex";
import propertyBestPriceSetup from "../code/propertyBestPriceSetup.ex";
import propertyBestPriceBody from "../code/propertyBestPriceBody.ex";

import bestPriceFail1 from "../code/bestPriceFail1.txt";
import bestPriceFail2 from "../code/bestPriceFail2.txt";
import propertyTestPassing from "../code/propertyTestPassing.txt";
import naiveFindBestPrice from "../code/naiveFindBestPrice.ex";

export default (
  <SlideSet>
    <Slide>
      <Heading size={2} textColor="tertiary">
        Using Generators
      </Heading>

      <NoteList
        notes={[
          "now that we can generate our own data structures",
          "let's use them"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={2}>
        Example-Based Test:
      </Heading>

      <CodePane textSize="2rem" lang="elixir" source={exampleBestPrice} />

      <NoteList
        notes={[
          "Here's the example-based test you might write without property testing",
          "make an orderbook where the best price is always the first value",
          "for sellers the best buyer is overpaying, and for buyers the best seller is under priced",
          "if this passes, could see calling it a day, BUT"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={2}>Too Easy</Heading>

      <CodePane textSize="2rem" lang="elixir" source={naiveFindBestPrice} />

      <NoteList
        notes={[
          "oops, miscommunication",
          "implementer (uh, me in this case) thought the lists would already be sorted",
          "so just grab the head of the list",
          "so easy!",
          "but let's say wrong",
          "if they're not sorted the code is wrong, and your stock market is going to return bad data"
        ]}
      />
    </Slide>

    <Slide bgImage="./img/bad-time.jpg" bgSize="contain" bgRepeat="no-repeat">
      <NoteList
        notes={[
          "gonna have a bad time",
          "but the test won't catch it",
          "let's write a test that will catch"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={2}>
        Property-Based Test Setup
      </Heading>

      <CodePane
        textSize="2.25rem"
        lang="elixir"
        source={propertyBestPriceSetup}
      />

      <NoteList notes={["the setup code", "generate arbitrary orderbook"]} />
    </Slide>

    <Slide>
      <Heading fit size={2}>
        Property-Based Test Body
      </Heading>

      <CodePane
        textSize="2.25rem"
        lang="elixir"
        source={propertyBestPriceBody}
      />

      <NoteList
        notes={[
          "the body",
          "get the best price from arbitrary orderbook for the type",
          "check that FOR EVERY sell order in the orderbook, the price is as good or worse",
          "run similar test for buy orders",
          "not as mathematical, but valid property",
          "hard part of property testing: coming up with a property that isn't just re-implementing the function",
          "just sorting and getting the head would be too close",
          "this isn't checking the price is right, it's checking that no price is better",
          "okay let's run it"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={2}>Oops, []</Heading>

      <CodePane textSize="1.75rem" lang="elixir" source={bestPriceFail1} />

      <NoteList
        notes={[
          "so we run the property test, and get an error",
          "lots of info here",
          "says how many runs it took to get a failure - zero in this case, that was quick",
          "and the inputs - an orderbook with empty lists",
          "ah-hah! we're not even handling empty lists!",
          "if it wasn't obvious, there's also a stack trace",
          "property tests are great at checking the empty case",
          "so we fix that, and"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={2}>Disordered Orders</Heading>

      <CodePane textSize="1.75rem" lang="elixir" source={bestPriceFail2} />

      <NoteList
        notes={[
          "another error",
          "this time took three tries to fail, that's better",
          "in this case we're checking for the best sell order",
          "and we get no buy orders and two sell orders",
          "ordered ascending instead of descending",
          "this is a surprisingly good counterexample for random data",
          "if there were buys and sells, it would be less clear what's up"
        ]}
      />
    </Slide>

    <Slide>
      <Heading fit size={1}>
        Arbitrary data is not{" "}
        <S type="bold" textColor="black">
          (quite)
        </S>{" "}
        random
      </Heading>

      <List>
        <ListItem>
          Arbitrary data is generated from a{" "}
          <S type="bold">complexity number</S>
        </ListItem>
        <ListItem>
          Inputs start out less complex, and become more complex
        </ListItem>
        <ListItem>
          Test returns <S type="bold">least complex</S> possible failing test
        </ListItem>
        <ListItem>
          Called <S type="bold">shrinking</S>
        </ListItem>
      </List>

      <NoteList
        notes={[
          "why a generator is different from factory bot",
          "why we saw generated data get more complex"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={2}>Passing Test</Heading>

      <CodePane textSize="2.25rem" lang="elixir" source={propertyTestPassing} />

      <NoteList
        notes={[
          "don't want to leave you hanging",
          "Given that nice counter example",
          "fix implementation",
          "tests passing",
          "property tests reported right alongside other ex_unit tests"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={2} textColor="tertiary">
        That&rsquo;s Property-Based Testing!
      </Heading>

      <List>
        <ListItem>Thinking of properties can feel hard</ListItem>
        <ListItem>But not that different from what you already do</ListItem>
        <ListItem>
          You already think of examples to demonstrate a property
        </ListItem>
        <ListItem>Just skip the example part!</ListItem>
      </List>

      <NoteList notes={["that's pretty much it for property testing"]} />
    </Slide>

    <Slide>
      <Heading size={1} fit>
        Supplement, Not Replacement
      </Heading>

      <List>
        <ListItem>Slower than example tests</ListItem>
        <ListItem>Not as good documentation</ListItem>
        <ListItem>Hard to come up with properties</ListItem>
      </List>

      <NoteList
        notes={[
          "Last note",
          "slower b/c many iterations",
          "example test is clearer documentation of how to use api for new dev",
          "not always easy to come up with a general property",
          "in real world use property test for important or easy to test stuff"
        ]}
      />
    </Slide>

    <Slide>
      <Heading size={1}>Moral of the story?</Heading>
    </Slide>

    <Slide>
      <Heading size={1}>Don&rsquo;t think for yourself</Heading>
    </Slide>

    <Slide>
      <Heading size={1}>Don&rsquo;t think for yourself</Heading>
      <Heading size={1} textColor="black" fit>
        (robots are better at it)
      </Heading>
    </Slide>
  </SlideSet>
);
