# 提示用户输入 tag 名称
echo "tag name:"
read name
#
# # 提示用户输入 commit 信息
echo "commit:"
read commit
git add . -v
git commit -v -m "$commit"
git push -v
echo ===================
git tag
echo ===================

#
# # 创建标签
git tag -a "$name" -m "$commit"
#
git push --tags -v
