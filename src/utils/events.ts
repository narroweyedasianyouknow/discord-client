type EventsTypes = "scroll-to-bottom";

type EventsTypesFuncs = {
  [K in EventsTypes]: (e?: ScrollToOptions) => void;
};
type IEvents = {
  [K in EventsTypes]?: Set<EventsTypesFuncs[K]>;
};
const events: IEvents = {};

export const addEventListener = function <T extends EventsTypes>(
  type: T,
  func: EventsTypesFuncs[T]
) {
  if (!events[type]) events[type] = new Set();

  events[type]?.add(func);

  return () => {
    events[type]?.delete(func);
  };
};

export const dispatchCustomEvent = function <T extends EventsTypes>(
  type: T,
  data?: Parameters<EventsTypesFuncs[T]>["0"]
) {
  const dispatch = events[type];
  if (dispatch && dispatch.size > 0) {
    for (const func of Array.from(dispatch)) {
      try {
        func(data);
      } catch (error) {
        console.log(`DISPATCH EVENT ERROR:: ${type}`, error);
      }
    }
  }
};
