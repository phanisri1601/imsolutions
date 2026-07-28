import numpy as np

tl = np.array([916, 287])
tr = np.array([1111, 328])
br = np.array([1107, 546])
bl = np.array([924, 502])

# To find a point at column c, row r (where IM is c=0, r=0)
# We can use bilinear interpolation.
def get_pt(c, r):
    # c: -1 (left), 0 (center), 1 (right)
    # r: 0 (middle row), 1 (bottom row)
    
    # Base vectors for c=0, r=0
    # But since it has perspective, extending linearly is close enough.
    
    # Let's just linearly extrapolate
    # Top edge interpolation (r=0)
    pt_top = tl + c * (tr - tl)
    # Bottom edge interpolation (r=1)
    pt_bot = bl + c * (br - bl)
    
    # Row interpolation
    return pt_top + r * (pt_bot - pt_top)

def get_face(c, r):
    # c, r is the top-left of the face
    p1 = get_pt(c, r)
    p2 = get_pt(c+1, r)
    p3 = get_pt(c+1, r+1)
    p4 = get_pt(c, r+1)
    return f"M {p1[0]},{p1[1]} L {p2[0]},{p2[1]} L {p3[0]},{p3[1]} L {p4[0]},{p4[1]} Z"

faces = {
    "strategy": (-1, 0),
    "creative": (1, 0),
    "technology": (-1, 1),
    "media": (0, 1),
    "growth": (1, 1)
}

for name, (c, r) in faces.items():
    print(f"'{name}': '{get_face(c, r)}',")

