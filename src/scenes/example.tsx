import {Audio, Circle, Img, Video, makeScene2D} from '@revideo/2d';
import {all, chain, createRef, Reference, waitFor} from '@revideo/core';

export default makeScene2D(function* (view) {
  const myCircle = createRef<Circle>();

  view.add(
    <Circle
      ref={myCircle}
      size={160}
      fill={'lightseagreen'}
    ></Circle>
  );

  yield *all(...someTasks(myCircle,4,3,0,3));   // grow AND disappear
  yield *all(...someTasks(myCircle,-1,-1,1,3)); // reappear
  yield *all(...someTasks(myCircle,1,3,-1,-1)); // shrink
});

function someTasks(ref: Reference<Circle>,scale:number,scaleTime:number,opacity:number,opacityTime:number)
{
  let tasks:any = [];
  if (scale >= 0)
    tasks.push(ref().scale(scale,scaleTime));
  if (opacity >= 0)
    tasks.push(ref().opacity(opacity,opacityTime));
  return tasks;
}
