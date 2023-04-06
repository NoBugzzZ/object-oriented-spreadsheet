const hrTime = process.hrtime

const start = hrTime.bigint() // 191051479007711n

setTimeout(() => {
  const end = hrTime.bigint() // 191052633396993n

  console.log(`Benchmark took ${end - start} nanoseconds`) // 基准测试耗时 1154389282 毫微秒
}, 1000)