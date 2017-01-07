'use strict';

import Carousel from '../src/carousel';
import React from 'react';
import ReactDom from 'react-dom';

window.React = React;

const ALL_DATA = Array(100).fill();
const ITEMS_TO_DISPLAY = 6;

const App = React.createClass({
  mixins: [Carousel.ControllerMixin],
  getInitialState() {
    return {
      slideIndex: 0, // relative to rendered items
    };
  },
  clickedImg(dataIndex, carouselSelectionDiff) {
    this.state.carousels.carousel.goToSlide(
      this.state.slideIndex + carouselSelectionDiff
    );
  },
  render() {
    const {slideIndex} = this.state;
    return (
      <div style={{width: '100%', margin: 'auto'}}>
        <Carousel
          ref="carousel"
          data={this.setCarouselData.bind(this, 'carousel')}
          slideIndex={this.state.slideIndex}
          afterSlide={newSlideIndex => this.setState({ slideIndex: newSlideIndex })}
          decorators={[]}
          dragging={false}
          slidesToShow={ITEMS_TO_DISPLAY}
          slidesToScroll={ITEMS_TO_DISPLAY}
          >
          {
            ALL_DATA.map((_, dataIndex) => {
              const carouselSelectionDiff = dataIndex - slideIndex;
              return (
                <img
                  onClick={() => this.clickedImg(dataIndex, carouselSelectionDiff)}
                  style={{'borderLeft':'1px solid'}}
                  key={'item' + dataIndex}
                  src={'http://placehold.it/100x100&text=slide' + dataIndex}
                  />
              );
            })
          }
        </Carousel>
      </div>
    )
  }
});

const content = document.getElementById('content');

ReactDom.render(<App/>, content)
