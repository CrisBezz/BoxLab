;; Lab-only indexed F64 -> expanded F32 packing. No topology editing or normals.
(module
 (memory (export "memory") 1 256)
 (func (export "pack") (param $indices i32) (param $output i32) (param $count i32)
  (local $i i32) (local $source i32)
  (block $done (loop $next
   (br_if $done (i32.ge_u (local.get $i) (local.get $count)))
   (local.set $source (i32.mul (i32.load (i32.add (local.get $indices) (i32.mul (local.get $i) (i32.const 4)))) (i32.const 24)))
   (f32.store (local.get $output) (f32.demote_f64 (f64.load (local.get $source))))
   (f32.store offset=4 (local.get $output) (f32.demote_f64 (f64.load offset=8 (local.get $source))))
   (f32.store offset=8 (local.get $output) (f32.demote_f64 (f64.load offset=16 (local.get $source))))
   (local.set $output (i32.add (local.get $output) (i32.const 12)))
   (local.set $i (i32.add (local.get $i) (i32.const 1)))
   (br $next)))))
