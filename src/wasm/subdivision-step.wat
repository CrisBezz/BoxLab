;; Lab-only batch port of subdivision.js at .1147. Production JS remains authoritative.
;; F64 operation order is retained for exact coordinate parity. UV interpolation excluded.
(module
  (memory (;0;) 1 256)
  (export "memory" (memory 0))
  (global $nv (mut i32) (i32.const 0))
  (global $nf (mut i32) (i32.const 0))
  (global $ne (mut i32) (i32.const 0))
  (global $v (mut i32) (i32.const 0))
  (global $fo (mut i32) (i32.const 0))
  (global $fi (mut i32) (i32.const 0))
  (global $e (mut i32) (i32.const 0))
  (global $veo (mut i32) (i32.const 0))
  (global $vei (mut i32) (i32.const 0))
  (global $vfo (mut i32) (i32.const 0))
  (global $vfi (mut i32) (i32.const 0))
  (global $fe (mut i32) (i32.const 0))
  (global $out (mut i32) (i32.const 0))
  (global $q (mut i32) (i32.const 0))
  (func $idx (param $p i32) (param $i i32) (result i32)
    (i32.load
      (i32.add
        (local.get 0)
        (i32.mul
          (local.get 1)
          (i32.const 4)))))
  (func $coord (param $p i32) (param $i i32) (param $d i32) (result f64)
    (f64.load
      (i32.add
        (local.get 0)
        (i32.mul
          (i32.add
            (i32.mul
              (local.get 1)
              (i32.const 3))
            (local.get 2))
          (i32.const 8)))))
  (func $put (param $i i32) (param $d i32) (param $value f64)
    (f64.store
      (i32.add
        (global.get 12)
        (i32.mul
          (i32.add
            (i32.mul
              (local.get 0)
              (i32.const 3))
            (local.get 1))
          (i32.const 8)))
      (local.get 2)))
  (func $edge (param $i i32) (param $field i32) (result f64)
    (f64.load
      (i32.add
        (global.get 6)
        (i32.mul
          (i32.add
            (i32.mul
              (local.get 0)
              (i32.const 6))
            (local.get 1))
          (i32.const 8)))))
  (func $other (param $e i32) (param $v i32) (result i32)
    (if (result i32)  ;; label = @1
      (i32.eq
        (i32.trunc_f64_u
          (call 3
            (local.get 0)
            (i32.const 0)))
        (local.get 1))
      (then
        (i32.trunc_f64_u
          (call 3
            (local.get 0)
            (i32.const 1))))
      (else
        (i32.trunc_f64_u
          (call 3
            (local.get 0)
            (i32.const 0))))))
  (func $lerp (param $a f64) (param $b f64) (param $w f64) (result f64)
    (f64.add
      (local.get 0)
      (f64.mul
        (f64.sub
          (local.get 1)
          (local.get 0))
        (local.get 2))))
  (func $face (param $i i32)
    (local $d i32) (local $j i32) (local $begin i32) (local $end i32) (local $sum f64)
    (local.set 3
      (call 0
        (global.get 4)
        (local.get 0)))
    (local.set 4
      (call 0
        (global.get 4)
        (i32.add
          (local.get 0)
          (i32.const 1))))
    (local.set 1
      (i32.const 0))
    (block $end_d
      (loop $loop_d
        (br_if 1 (;@1;)
          (i32.ge_u
            (local.get 1)
            (i32.const 3)))
        (local.set 5
          (f64.const 0x0p+0 (;=0;)))
        (local.set 2
          (local.get 3))
        (block $end_j
          (loop $loop_j
            (br_if 1 (;@3;)
              (i32.ge_u
                (local.get 2)
                (local.get 4)))
            (local.set 5
              (f64.add
                (local.get 5)
                (call 1
                  (global.get 3)
                  (call 0
                    (global.get 5)
                    (local.get 2))
                  (local.get 1))))
            (local.set 2
              (i32.add
                (local.get 2)
                (i32.const 1)))
            (br 0 (;@4;))))
        (call 2
          (i32.add
            (i32.add
              (global.get 0)
              (global.get 2))
            (local.get 0))
          (local.get 1)
          (f64.mul
            (local.get 5)
            (f64.div
              (f64.const 0x1p+0 (;=1;))
              (f64.convert_i32_u
                (i32.sub
                  (local.get 4)
                  (local.get 3))))))
        (local.set 1
          (i32.add
            (local.get 1)
            (i32.const 1)))
        (br 0 (;@2;)))))
  (func $edgepoint (param $i i32)
    (local $d i32) (local $a f64) (local $b f64) (local $mid f64) (local $smooth f64)
    (local.set 1
      (i32.const 0))
    (block $end_d
      (loop $loop_d
        (br_if 1 (;@1;)
          (i32.ge_u
            (local.get 1)
            (i32.const 3)))
        (local.set 2
          (call 1
            (global.get 3)
            (i32.trunc_f64_u
              (call 3
                (local.get 0)
                (i32.const 0)))
            (local.get 1)))
        (local.set 3
          (call 1
            (global.get 3)
            (i32.trunc_f64_u
              (call 3
                (local.get 0)
                (i32.const 1)))
            (local.get 1)))
        (local.set 4
          (f64.mul
            (f64.add
              (local.get 2)
              (local.get 3))
            (f64.const 0x1p-1 (;=0.5;))))
        (local.set 5
          (local.get 4))
        (if  ;; label = @3
          (f64.eq
            (call 3
              (local.get 0)
              (i32.const 2))
            (f64.const 0x1p+1 (;=2;)))
          (then
            (local.set 5
              (f64.mul
                (f64.add
                  (f64.add
                    (f64.add
                      (local.get 2)
                      (local.get 3))
                    (call 1
                      (global.get 12)
                      (i32.add
                        (i32.add
                          (global.get 0)
                          (global.get 2))
                        (i32.trunc_f64_u
                          (call 3
                            (local.get 0)
                            (i32.const 3))))
                      (local.get 1)))
                  (call 1
                    (global.get 12)
                    (i32.add
                      (i32.add
                        (global.get 0)
                        (global.get 2))
                      (i32.trunc_f64_u
                        (call 3
                          (local.get 0)
                          (i32.const 4))))
                    (local.get 1)))
                (f64.const 0x1p-2 (;=0.25;))))))
        (call 2
          (i32.add
            (global.get 0)
            (local.get 0))
          (local.get 1)
          (call 5
            (local.get 5)
            (local.get 4)
            (call 3
              (local.get 0)
              (i32.const 5))))
        (local.set 1
          (i32.add
            (local.get 1)
            (i32.const 1)))
        (br 0 (;@2;)))))
  (func $vertex (param $i i32)
    (local $d i32) (local $j i32) (local $k i32) (local $begin i32) (local $end i32) (local $ei i32) (local $neighbor i32) (local $bc i32) (local $cc i32) (local $n0 i32) (local $n1 i32) (local $n2 i32) (local $w f64) (local $w0 f64) (local $w1 f64) (local $w2 f64) (local $p f64) (local $f f64) (local $r f64) (local $bs f64) (local $n f64) (local $smooth f64) (local $sharp f64)
    (local.set 4
      (call 0
        (global.get 7)
        (local.get 0)))
    (local.set 5
      (call 0
        (global.get 7)
        (i32.add
          (local.get 0)
          (i32.const 1))))
    (local.set 2
      (local.get 4))
    (block $end_j
      (loop $loop_j
        (br_if 1 (;@1;)
          (i32.ge_u
            (local.get 2)
            (local.get 5)))
        (local.set 6
          (call 0
            (global.get 8)
            (local.get 2)))
        (if  ;; label = @3
          (f64.eq
            (call 3
              (local.get 6)
              (i32.const 2))
            (f64.const 0x1p+0 (;=1;)))
          (then
            (local.set 8
              (i32.add
                (local.get 8)
                (i32.const 1)))))
        (local.set 13
          (call 3
            (local.get 6)
            (i32.const 5)))
        (if  ;; label = @3
          (f64.gt
            (local.get 13)
            (f64.const 0x0p+0 (;=0;)))
          (then
            (local.set 9
              (i32.add
                (local.get 9)
                (i32.const 1)))
            (local.set 7
              (call 4
                (local.get 6)
                (local.get 0)))
            (if  ;; label = @4
              (f64.gt
                (local.get 13)
                (local.get 14))
              (then
                (local.set 16
                  (local.get 15))
                (local.set 12
                  (local.get 11))
                (local.set 15
                  (local.get 14))
                (local.set 11
                  (local.get 10))
                (local.set 14
                  (local.get 13))
                (local.set 10
                  (local.get 7)))
              (else
                (if  ;; label = @5
                  (f64.gt
                    (local.get 13)
                    (local.get 15))
                  (then
                    (local.set 16
                      (local.get 15))
                    (local.set 12
                      (local.get 11))
                    (local.set 15
                      (local.get 13))
                    (local.set 11
                      (local.get 7)))
                  (else
                    (if  ;; label = @6
                      (f64.gt
                        (local.get 13)
                        (local.get 16))
                      (then
                        (local.set 16
                          (local.get 13))
                        (local.set 12
                          (local.get 7))))))))))
        (local.set 2
          (i32.add
            (local.get 2)
            (i32.const 1)))
        (br 0 (;@2;))))
    (local.set 21
      (f64.convert_i32_u
        (i32.sub
          (call 0
            (global.get 9)
            (i32.add
              (local.get 0)
              (i32.const 1)))
          (call 0
            (global.get 9)
            (local.get 0)))))
    (if  ;; label = @1
      (f64.eq
        (local.get 21)
        (f64.const 0x0p+0 (;=0;)))
      (then
        (local.set 21
          (f64.const 0x1p+0 (;=1;)))))
    (local.set 1
      (i32.const 0))
    (block $end_d
      (loop $loop_d
        (br_if 1 (;@1;)
          (i32.ge_u
            (local.get 1)
            (i32.const 3)))
        (local.set 17
          (call 1
            (global.get 3)
            (local.get 0)
            (local.get 1)))
        (local.set 18
          (f64.const 0x0p+0 (;=0;)))
        (local.set 19
          (f64.const 0x0p+0 (;=0;)))
        (local.set 20
          (f64.const 0x0p+0 (;=0;)))
        (local.set 2
          (local.get 4))
        (block $end_j
          (loop $loop_j
            (br_if 1 (;@3;)
              (i32.ge_u
                (local.get 2)
                (local.get 5)))
            (local.set 6
              (call 0
                (global.get 8)
                (local.get 2)))
            (local.set 7
              (call 4
                (local.get 6)
                (local.get 0)))
            (local.set 19
              (f64.add
                (f64.add
                  (local.get 19)
                  (local.get 17))
                (call 1
                  (global.get 3)
                  (local.get 7)
                  (local.get 1))))
            (if  ;; label = @5
              (f64.eq
                (call 3
                  (local.get 6)
                  (i32.const 2))
                (f64.const 0x1p+0 (;=1;)))
              (then
                (local.set 20
                  (f64.add
                    (local.get 20)
                    (call 1
                      (global.get 3)
                      (local.get 7)
                      (local.get 1))))))
            (local.set 2
              (i32.add
                (local.get 2)
                (i32.const 1)))
            (br 0 (;@4;))))
        (if  ;; label = @3
          (i32.ge_u
            (local.get 8)
            (i32.const 2))
          (then
            (call 2
              (local.get 0)
              (local.get 1)
              (f64.add
                (f64.mul
                  (local.get 17)
                  (f64.const 0x1.8p-1 (;=0.75;)))
                (f64.mul
                  (f64.mul
                    (local.get 20)
                    (f64.div
                      (f64.const 0x1p+0 (;=1;))
                      (f64.convert_i32_u
                        (local.get 8))))
                  (f64.const 0x1p-2 (;=0.25;))))))
          (else
            (local.set 3
              (call 0
                (global.get 9)
                (local.get 0)))
            (block $end_k
              (loop $loop_k
                (br_if 1 (;@4;)
                  (i32.ge_u
                    (local.get 3)
                    (call 0
                      (global.get 9)
                      (i32.add
                        (local.get 0)
                        (i32.const 1)))))
                (local.set 18
                  (f64.add
                    (local.get 18)
                    (call 1
                      (global.get 12)
                      (i32.add
                        (i32.add
                          (global.get 0)
                          (global.get 2))
                        (call 0
                          (global.get 10)
                          (local.get 3)))
                      (local.get 1))))
                (local.set 3
                  (i32.add
                    (local.get 3)
                    (i32.const 1)))
                (br 0 (;@5;))))
            (local.set 18
              (f64.mul
                (local.get 18)
                (f64.div
                  (f64.const 0x1p+0 (;=1;))
                  (local.get 21))))
            (if  ;; label = @4
              (i32.gt_u
                (local.get 5)
                (local.get 4))
              (then
                (local.set 19
                  (f64.mul
                    (local.get 19)
                    (f64.div
                      (f64.const 0x1p+0 (;=1;))
                      (f64.convert_i32_u
                        (i32.mul
                          (i32.sub
                            (local.get 5)
                            (local.get 4))
                          (i32.const 2))))))))
            (local.set 22
              (f64.mul
                (f64.add
                  (f64.add
                    (local.get 18)
                    (f64.mul
                      (local.get 19)
                      (f64.const 0x1p+1 (;=2;))))
                  (f64.mul
                    (local.get 17)
                    (f64.sub
                      (local.get 21)
                      (f64.const 0x1.8p+1 (;=3;)))))
                (f64.div
                  (f64.const 0x1p+0 (;=1;))
                  (local.get 21))))
            (if  ;; label = @4
              (i32.eq
                (local.get 9)
                (i32.const 1))
              (then
                (local.set 22
                  (call 5
                    (local.get 22)
                    (local.get 17)
                    (f64.mul
                      (f64.min
                        (f64.const 0x1p+0 (;=1;))
                        (local.get 14))
                      (f64.const 0x1.8p-1 (;=0.75;)))))))
            (if  ;; label = @4
              (i32.eq
                (local.get 9)
                (i32.const 2))
              (then
                (local.set 23
                  (f64.add
                    (f64.add
                      (f64.mul
                        (local.get 17)
                        (f64.const 0x1.8p-1 (;=0.75;)))
                      (f64.mul
                        (call 1
                          (global.get 3)
                          (local.get 10)
                          (local.get 1))
                        (f64.const 0x1p-3 (;=0.125;))))
                    (f64.mul
                      (call 1
                        (global.get 3)
                        (local.get 11)
                        (local.get 1))
                      (f64.const 0x1p-3 (;=0.125;)))))
                (local.set 22
                  (call 5
                    (local.get 22)
                    (local.get 23)
                    (f64.min
                      (f64.const 0x1p+0 (;=1;))
                      (f64.mul
                        (f64.add
                          (local.get 14)
                          (local.get 15))
                        (f64.const 0x1p-1 (;=0.5;))))))))
            (if  ;; label = @4
              (i32.ge_u
                (local.get 9)
                (i32.const 3))
              (then
                (local.set 22
                  (call 5
                    (local.get 22)
                    (local.get 17)
                    (f64.min
                      (f64.const 0x1p+0 (;=1;))
                      (f64.div
                        (f64.add
                          (f64.add
                            (local.get 14)
                            (local.get 15))
                          (local.get 16))
                        (f64.const 0x1.8p+1 (;=3;))))))))
            (call 2
              (local.get 0)
              (local.get 1)
              (local.get 22))))
        (local.set 1
          (i32.add
            (local.get 1)
            (i32.const 1)))
        (br 0 (;@2;)))))
  (func $quads (param $i i32)
    (local $j i32) (local $b i32) (local $end i32) (local $prev i32) (local $dest i32)
    (local.set 2
      (call 0
        (global.get 4)
        (local.get 0)))
    (local.set 3
      (call 0
        (global.get 4)
        (i32.add
          (local.get 0)
          (i32.const 1))))
    (local.set 1
      (local.get 2))
    (block $end_j
      (loop $loop_j
        (br_if 1 (;@1;)
          (i32.ge_u
            (local.get 1)
            (local.get 3)))
        (local.set 4
          (if (result i32)  ;; label = @3
            (i32.eq
              (local.get 1)
              (local.get 2))
            (then
              (i32.sub
                (local.get 3)
                (i32.const 1)))
            (else
              (i32.sub
                (local.get 1)
                (i32.const 1)))))
        (local.set 5
          (i32.add
            (global.get 13)
            (i32.mul
              (local.get 1)
              (i32.const 16))))
        (i32.store
          (local.get 5)
          (call 0
            (global.get 5)
            (local.get 1)))
        (i32.store offset=4
          (local.get 5)
          (i32.add
            (global.get 0)
            (call 0
              (global.get 11)
              (local.get 1))))
        (i32.store offset=8
          (local.get 5)
          (i32.add
            (i32.add
              (global.get 0)
              (global.get 2))
            (local.get 0)))
        (i32.store offset=12
          (local.get 5)
          (i32.add
            (global.get 0)
            (call 0
              (global.get 11)
              (local.get 4))))
        (local.set 1
          (i32.add
            (local.get 1)
            (i32.const 1)))
        (br 0 (;@2;)))))
  (func (;10;) (param $p_nv i32) (param $p_nf i32) (param $p_ne i32) (param $p_v i32) (param $p_fo i32) (param $p_fi i32) (param $p_e i32) (param $p_veo i32) (param $p_vei i32) (param $p_vfo i32) (param $p_vfi i32) (param $p_fe i32) (param $p_out i32) (param $p_q i32)
    (local $i i32)
    (global.set 0
      (local.get 0))
    (global.set 1
      (local.get 1))
    (global.set 2
      (local.get 2))
    (global.set 3
      (local.get 3))
    (global.set 4
      (local.get 4))
    (global.set 5
      (local.get 5))
    (global.set 6
      (local.get 6))
    (global.set 7
      (local.get 7))
    (global.set 8
      (local.get 8))
    (global.set 9
      (local.get 9))
    (global.set 10
      (local.get 10))
    (global.set 11
      (local.get 11))
    (global.set 12
      (local.get 12))
    (global.set 13
      (local.get 13))
    (local.set 14
      (i32.const 0))
    (block $end_i
      (loop $loop_i
        (br_if 1 (;@1;)
          (i32.ge_u
            (local.get 14)
            (global.get 1)))
        (call 6
          (local.get 14))
        (local.set 14
          (i32.add
            (local.get 14)
            (i32.const 1)))
        (br 0 (;@2;))))
    (local.set 14
      (i32.const 0))
    (block $end_i
      (loop $loop_i
        (br_if 1 (;@1;)
          (i32.ge_u
            (local.get 14)
            (global.get 2)))
        (call 7
          (local.get 14))
        (local.set 14
          (i32.add
            (local.get 14)
            (i32.const 1)))
        (br 0 (;@2;))))
    (local.set 14
      (i32.const 0))
    (block $end_i
      (loop $loop_i
        (br_if 1 (;@1;)
          (i32.ge_u
            (local.get 14)
            (global.get 0)))
        (call 8
          (local.get 14))
        (local.set 14
          (i32.add
            (local.get 14)
            (i32.const 1)))
        (br 0 (;@2;))))
    (local.set 14
      (i32.const 0))
    (block $end_i
      (loop $loop_i
        (br_if 1 (;@1;)
          (i32.ge_u
            (local.get 14)
            (global.get 1)))
        (call 9
          (local.get 14))
        (local.set 14
          (i32.add
            (local.get 14)
            (i32.const 1)))
        (br 0 (;@2;)))))
  (export "step" (func 10))
  (type (;0;) (func (param i32 i32) (result i32)))
  (type (;1;) (func (param i32 i32 i32) (result f64)))
  (type (;2;) (func (param i32 i32 f64)))
  (type (;3;) (func (param i32 i32) (result f64)))
  (type (;4;) (func (param f64 f64 f64) (result f64)))
  (type (;5;) (func (param i32)))
  (type (;6;) (func (param i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32))))
