'use strict';

import Carousel from '../src/carousel';
import React from 'react';
import ReactDom from 'react-dom';

window.React = React;

// [0,1,2,3,...99]
const ALL_DATA = Array.apply(null, {length: 100}).map(Number.call, Number);
const ITEMS_TO_DISPLAY = 2;

const App = React.createClass({
  mixins: [Carousel.ControllerMixin],
  getInitialState() {
    return {
      selectedCarouselIndex: 0, // relative to rendered items
      selectedDataIndex: 0, // where we are relative to start
      firstDataIndexToRender: 0,
    };
  },
  clickedImg(dataIndex, carouselSelectionDiff) {
    this.state.carousels.carousel.goToSlide(
      this.state.selectedCarouselIndex + carouselSelectionDiff
    );
  },
  afterSlide(newSelectedCarouselIndex) {
    console.log('after slide to index: ', newSelectedCarouselIndex);
    const {origImgIds, onImgSelected} = this.props;
    const newImgId = ALL_DATA[newSelectedCarouselIndex];

    const {firstDataIndexToRender, selectedDataIndex, selectedCarouselIndex} = this.state;
    const moveDiff = newSelectedCarouselIndex - selectedCarouselIndex;

    const newSelectedDataIndex = selectedDataIndex + moveDiff;
    const newFirstDataIndexToRender = Math.max(0, newSelectedDataIndex - ITEMS_TO_DISPLAY);
    const dataIndexRenderDiff = newFirstDataIndexToRender - firstDataIndexToRender;
    const newSelectedCarouselIndexAdjusted = selectedCarouselIndex + moveDiff - dataIndexRenderDiff;
    this.setState({
      selectedCarouselIndex: newSelectedCarouselIndexAdjusted,
      selectedDataIndex: newSelectedDataIndex,
      firstDataIndexToRender: newFirstDataIndexToRender,
    });
  },
  render() {
    const {firstDataIndexToRender, selectedDataIndex, selectedCarouselIndex} = this.state;
    const lastDataIndexToRender = Math.min(ALL_DATA.length - 1, selectedDataIndex + ITEMS_TO_DISPLAY * 2 - 1);
    console.log('render data indices', firstDataIndexToRender, 'to', lastDataIndexToRender);
    return (
      <div style={{width: '100%', margin: 'auto'}}>
        <Carousel
          ref="carousel"
          data={this.setCarouselData.bind(this, 'carousel')}
          slideIndex={this.state.selectedCarouselIndex}
          afterSlide={newSelectedCarouselIndex => this.afterSlide(newSelectedCarouselIndex)}
          decorators={[]}
          dragging={false}
          speed={2000}
          slidesToShow={ITEMS_TO_DISPLAY}
          slidesToScroll={ITEMS_TO_DISPLAY}
          >
          {
            ALL_DATA.slice(firstDataIndexToRender, lastDataIndexToRender + 1).map((dataIndex, renderedItemIndex) => {
              const carouselSelectionDiff = renderedItemIndex - selectedCarouselIndex;
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
