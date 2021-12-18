import { performance } from 'perf_hooks';

export function TimeMeasurement(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;
  const className = target.constructor.name;

  descriptor.value = async function (...args: any[]) {
    const start = performance.now();
    const result = await originalMethod.apply(this, args);
    console.log(
      `Duration of ${className}::${methodName} is ${Number(
        performance.now() - start,
      ).toFixed(0)} ms`,
    );
    return result;
  };
}
